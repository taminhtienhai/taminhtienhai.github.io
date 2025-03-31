<script lang="ts">
  import { delay } from "../common/utils";

  let {
    limit = $bindable(0),
    total = 0,
    hidden = $bindable(true),
    step = 5,
  } = $props();

  $effect(() => {
    if (!hidden && limit < total) {
      // todo: replace this by remote call
      delay(() => {
        limit += step;
      });
    }
  });
</script>

<span class="loading loading-dots" class:hidden={hidden || limit >= total}></span>
