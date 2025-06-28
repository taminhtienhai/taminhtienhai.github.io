<script lang="ts">
    import { delay_times_of, delay_val } from "$lib/common/utils";
    import { onDestroy, onMount } from "svelte";

    type TypeEffectType = {
        content: string,
        speed?: number,
        initDelay?: number,
    };
    let {
        content,
        speed = 50,
        initDelay = 0,
    }: TypeEffectType = $props();

    let target: HTMLSpanElement;

    const raws = content.split(',');
    const splitContents = [
        ...raws.slice(0, raws.length - 1).map(it => it + ','),
        raws[raws.length - 1],
    ];
    const delays = delay_times_of(splitContents, speed, initDelay);
    const interval_ids: NodeJS.Timeout[] = Array.from({ length: splitContents.length });
    const positions: number[] = Array.from({ length: splitContents.length }).map(_ => 0);

    onMount(() => {
        delays.forEach((_, index) => {
            delay_val(0, delays[index - 1] ?? initDelay).then(() => {
                interval_ids[index] = setInterval(() => {
                    if (!target) { return clearInterval(interval_ids[index]); }
                    const content = splitContents[index];
                    const pos = positions[index];
                    target.append(content[pos] ?? '');
                    positions[index] += 1;
                    if (positions[index] >= splitContents[index].length) {
                        clearInterval(interval_ids[index]);
                    }
                }, speed)
            });
        });
    });

    onDestroy(() => {
        interval_ids.forEach(id => clearInterval(id));
    });
</script>

<span bind:this={target}></span>
