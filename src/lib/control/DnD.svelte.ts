import { extract, type MaybeGetter } from "runed";
import { onDestroy, untrack } from "svelte";

function noop(): void {}

export interface DnDStateOptions {
	/**
	 * The draggable element.
	 */
	element: MaybeGetter<HTMLElement | null | undefined>;

	/**
	 * Optional drag handle element (if different from main element).
	 */
	handle?: MaybeGetter<HTMLElement | null | undefined>;

	/**
	 * Initial position. If undefined, uses element's current position.
	 */
	initialPosition?: MaybeGetter<{ x: number; y: number } | undefined>;

	/**
	 * Constrain dragging within a container element.
	 */
	constraint?: MaybeGetter<HTMLElement | null | undefined>;

	/**
	 * Drag axis constraint.
	 * @default 'both'
	 */
	axis?: MaybeGetter<"x" | "y" | "both" | undefined>;

	/**
	 * Disable dragging.
	 * @default false
	 */
	disabled?: MaybeGetter<boolean | undefined>;

	/**
	 * Use CSS transform instead of position properties.
	 * ⚡ Better performance, but may conflict with existing transforms.
	 * @default true
	 */
	useTransform?: MaybeGetter<boolean | undefined>;

	/**
	 * Callbacks
	 */
	onDragStart?: (e: PointerEvent, position: { x: number; y: number }) => void;
	onDrag?: (e: PointerEvent, position: { x: number; y: number }) => void;
	onDragEnd?: (e: PointerEvent, position: { x: number; y: number }) => void;

	/**
	 * Event listener options for pointer events.
	 * @default { capture: true }
	 */
	eventListenerOptions?: AddEventListenerOptions;

	/**
	 * Optional error handler.
	 * @default console.error
	 */
	onError?: (error: unknown) => void;
}

/**
 * Reactive drag-and-drop state utility for Svelte.
 *
 * Features:
 * - Pointer events (works with mouse, touch, pen)
 * - Optional drag handle
 * - Boundary constraints
 * - Axis locking
 * - Transform or position-based positioning
 *
 * ⚠️ Edge cases:
 * - Element must have position:absolute/relative/fixed for position-based mode
 * - Transform mode may conflict with existing CSS transforms
 * - Constraint boundaries are calculated once on mount
 *
 * @example
 * ```svelte
 * <script>
 *   let el = $state();
 *   const dnd = new DnDState({
 *     element: () => el,
 *     onDrag: (e, pos) => console.log(pos)
 *   });
 * </script>
 * <div bind:this={el}>Drag me</div>
 * ```
 */
export class DragState {
	#options!: DnDStateOptions;
	element = $derived(extract(this.#options.element));
	handle = $derived(extract(this.#options.handle) ?? this.element);
	constraint = $derived(extract(this.#options.constraint));
	axis = $derived(extract(this.#options.axis, "both"));
	disabled = $derived(extract(this.#options.disabled, false));
	useTransform = $derived(extract(this.#options.useTransform, true));
	initialPosition = $derived(extract(this.#options.initialPosition));

	onDragStart = $derived(this.#options.onDragStart ?? noop);
	onDrag = $derived(this.#options.onDrag ?? noop);
	onDragEnd = $derived(this.#options.onDragEnd ?? noop);
	eventListenerOptions = $derived(
		this.#options.eventListenerOptions ?? { capture: true, passive: false  }
	);
	onError = $derived(
		this.#options.onError ?? ((e: unknown) => console.error(e))
	);

	/** State */
	isDragging = $state(false);
	x = $state(0);
	y = $state(0);
    pointerX = $state(0);
	pointerY = $state(0);

	/** Internal tracking */
    #activePointerId: number | null = null;
	#startX = 0;
	#startY = 0;
	#initialElementX = 0;
	#initialElementY = 0;
	#bounds: DOMRect | null = null;
	#constraintBounds: DOMRect | null = null;

	constructor(options: DnDStateOptions) {
		this.#options = options;

		$effect(() => {
			const h = this.handle;
			if (!h || this.disabled) return;

			h.addEventListener("pointerdown", this.#onPointerDown, this.eventListenerOptions);
			return () => {
				h.removeEventListener("pointerdown", this.#onPointerDown, this.eventListenerOptions);
			};
		});

		$effect(() => {
			if (this.element) {
				untrack(() => this.#initializePosition());
			}
		});

		onDestroy(() => {
			this.#cleanup();
		});
	}

	#initializePosition = () => {
		if (!this.element) return;

		if (this.initialPosition) {
			this.x = this.initialPosition.x;
			this.y = this.initialPosition.y;
			this.#applyPosition();
		} else if (this.useTransform) {
			// Parse existing transform if present
			const style = getComputedStyle(this.element);
			const transform = style.transform;
			if (transform && transform !== "none") {
				const matrix = new DOMMatrix(transform);
				this.x = matrix.m41;
				this.y = matrix.m42;
			}
		} else {
			// Use current offset position
			this.x = this.element.offsetLeft;
			this.y = this.element.offsetTop;
		}
	};

	#onPointerDown = (e: PointerEvent) => {
		if (this.disabled || !this.element || !this.handle) return;

		if (e.button !== 0) return; // Primary button only
		if (this.#activePointerId !== null) return; // Already dragging

		try {
			e.preventDefault();
			e.stopPropagation();

			this.#activePointerId = e.pointerId;
			this.isDragging = true;
			this.#startX = e.clientX;
			this.#startY = e.clientY;
            this.pointerX = e.clientX;
			this.pointerY = e.clientY;
			this.#initialElementX = this.x;
			this.#initialElementY = this.y;

			// Cache bounds for constraint checking
			this.#bounds = this.element.getBoundingClientRect();
			if (this.constraint) {
				this.#constraintBounds = this.constraint.getBoundingClientRect();
			}

			// Capture pointer and disable touch actions for all subsequent events
			this.handle.setPointerCapture(e.pointerId);
			this.handle.style.touchAction = "none";
            if (this.element) this.element.style.willChange = "transform";

			// Attach move/up listeners to document for smooth dragging
			document.addEventListener("pointermove", this.#onPointerMove, this.eventListenerOptions);
			document.addEventListener("pointerup", this.#onPointerUp, this.eventListenerOptions);
			document.addEventListener("pointercancel", this.#onPointerUp, this.eventListenerOptions);

			this.onDragStart(e, { x: this.x, y: this.y });
		} catch (error) {
			this.onError(error);
		}
	};

	#onPointerMove = (e: PointerEvent) => {
		if (!this.isDragging || !this.element) return;
		if (e.pointerId !== this.#activePointerId) return;

		try {
			const deltaX = e.clientX - this.#startX;
			const deltaY = e.clientY - this.#startY;

			// Calculate new position
			let newX = this.#initialElementX + deltaX;
			let newY = this.#initialElementY + deltaY;
            this.pointerX = e.clientX;
			this.pointerY = e.clientY;

			// Apply axis constraints
			if (this.axis === "x") newY = this.y;
			if (this.axis === "y") newX = this.x;

			// Apply boundary constraints
			if (this.#constraintBounds && this.#bounds) {
				const minX = this.#constraintBounds.left - this.#bounds.left + this.#initialElementX;
				const maxX = this.#constraintBounds.right - this.#bounds.right + this.#initialElementX;
				const minY = this.#constraintBounds.top - this.#bounds.top + this.#initialElementY;
				const maxY = this.#constraintBounds.bottom - this.#bounds.bottom + this.#initialElementY;

				newX = Math.max(minX, Math.min(maxX, newX));
				newY = Math.max(minY, Math.min(maxY, newY));
			}

			this.x = newX;
			this.y = newY;

			this.#applyPosition();
			this.onDrag(e, { x: this.x, y: this.y });
		} catch (error) {
			this.onError(error);
		}
	};

	#onPointerUp = (e: PointerEvent) => {
		if (!this.isDragging) return;
		if (e.pointerId !== this.#activePointerId) return;

		try {
			this.isDragging = false;
			this.#activePointerId = null;

			document.removeEventListener("pointermove", this.#onPointerMove, this.eventListenerOptions);
			document.removeEventListener("pointerup", this.#onPointerUp, this.eventListenerOptions);
			document.removeEventListener("pointercancel", this.#onPointerUp, this.eventListenerOptions);

			if (this.handle) {
				this.handle.releasePointerCapture(e.pointerId);
				this.handle.style.touchAction = "";
			}

            if (this.element) this.element.style.willChange = "";
			this.onDragEnd(e, { x: this.x, y: this.y });
		} catch (error) {
			this.onError(error);
		}
	};

	#applyPosition = () => {
		if (!this.element) return;

		if (this.useTransform) {
			this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
		} else {
			this.element.style.left = `${this.x}px`;
			this.element.style.top = `${this.y}px`;
		}
	};

	#cleanup = () => {
		document.removeEventListener("pointermove", this.#onPointerMove, this.eventListenerOptions);
		document.removeEventListener("pointerup", this.#onPointerUp, this.eventListenerOptions);
		document.removeEventListener("pointercancel", this.#onPointerUp, this.eventListenerOptions);
	};

	/**
	 * Programmatically set position.
	 */
	setPosition(x: number, y: number) {
		this.x = x;
		this.y = y;
		this.#applyPosition();
	}

	/**
	 * Reset to initial position.
	 */
	reset() {
		if (this.initialPosition) {
			this.setPosition(this.initialPosition.x, this.initialPosition.y);
		} else {
			this.setPosition(0, 0);
		}
	}
}

export interface DropZoneOptions {
	/**
	 * The drop zone element.
	 */
	zoneElement: MaybeGetter<HTMLElement | null | undefined>;

	/**
	 * The DnDState instance to monitor.
	 */
	dndState: DragState;

	/**
	 * Callbacks
	 */
	onDrop?: (el: HTMLElement) => void;
	onEnter?: (el: HTMLElement) => void;
	onLeave?: (el: HTMLElement) => void;
}

/**
 * Reactive drop zone utility for Svelte.
 * Observes a DnDState instance for collision.
 *
 * ⚠️ Edge case:
 * - Assumes drop zone is static (doesn't move).
 * - Caches bounds onMount. Use ResizeObserver for dynamic zones.
 */
export class DropZone {
	#options!: DropZoneOptions;
	zoneElement = $derived(extract(this.#options.zoneElement));
	dnd = $derived(this.#options.dndState);

	onDrop = $derived(this.#options.onDrop ?? noop);
	onEnter = $derived(this.#options.onEnter ?? noop);
	onLeave = $derived(this.#options.onLeave ?? noop);

	/** State */
	isOver = $state(false);

	/** Internal tracking */
	#zoneRect = $state<DOMRect | null>(null);
	#resizeObserver: ResizeObserver | null = null;

	constructor(options: DropZoneOptions) {
		this.#options = options;

		// Cache the zone's bounds.
		// For dynamic zones, you'd use a ResizeObserver here.
        $effect(() => {
			if (this.dnd.isDragging && this.zoneElement) {
				// Recalculate bounds at the *start* of the drag
				this.#zoneRect = this.zoneElement.getBoundingClientRect();
			}
		});

		// 1. Reactive calculation for "isOver"
		// This is very fast: it only compares numbers.
		const isPointerOver = () => {
			const rect = this.#zoneRect;
			const px = this.dnd.pointerX;
			const py = this.dnd.pointerY;

			if (rect) {
				return (
					px >= rect.left &&
					px <= rect.right &&
					py >= rect.top &&
					py <= rect.bottom
				);
			}
			return false;
		};

		$effect(() => {
            const el = this.zoneElement;
            if (!el) {
                this.#resizeObserver?.disconnect();
                this.#resizeObserver = null;
                return;
            }

            this.#resizeObserver = new ResizeObserver(() => {
                if (el) {
                    this.#zoneRect = el.getBoundingClientRect();
                }
            });
            this.#resizeObserver.observe(el);

            return () => {
                this.#resizeObserver?.disconnect();
                this.#resizeObserver = null;
            };
        });

		// 2. Effect to handle enter/leave events
		$effect(() => {
			const isNowOver = isPointerOver();
			const wasOver = untrack(() => this.isOver);
			this.isOver = isNowOver; // Update public state

			const draggable = untrack(() => this.dnd.element);
			if (!draggable) return;

			if (isNowOver && !wasOver) {
				this.onEnter(draggable);
			} else if (!isNowOver && wasOver) {
				this.onLeave(draggable);
			}
		});

		// 3. Effect to handle the "drop" event
		$effect(() => {
			// This effect only depends on `isDragging`
			if (this.dnd.isDragging) return;

			// This code runs when `isDragging` becomes false.
			// We check the *last known value* of `isOver`.
			const wasOver = untrack(() => this.isOver);
			const draggable = untrack(() => this.dnd.element);

			if (wasOver && draggable) {
				this.onDrop(draggable);
			}
		});
	}
}