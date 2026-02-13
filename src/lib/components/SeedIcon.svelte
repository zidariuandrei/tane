<script lang="ts">
import BambooSapling from './icons/BambooSapling.svelte';
import BambooSeed from './icons/BambooSeed.svelte';
import BambooSprout from './icons/BambooSprout.svelte';
import BambooTree from './icons/BambooTree.svelte';

import Branch from './icons/Branch.svelte'; // For failed/withered
import FernSapling from './icons/FernSapling.svelte';
import FernSeed from './icons/FernSeed.svelte';
import FernSprout from './icons/FernSprout.svelte';
import FernTree from './icons/FernTree.svelte';
import OakSapling from './icons/OakSapling.svelte';
import OakSeed from './icons/OakSeed.svelte';
import OakSprout from './icons/OakSprout.svelte';
import OakTree from './icons/OakTree.svelte';
import PineSapling from './icons/PineSapling.svelte';
import PineSeed from './icons/PineSeed.svelte';
import PineSprout from './icons/PineSprout.svelte';
import PineTree from './icons/PineTree.svelte';
import SakuraSapling from './icons/SakuraSapling.svelte';
import SakuraSeed from './icons/SakuraSeed.svelte';
import SakuraSprout from './icons/SakuraSprout.svelte';
import SakuraTree from './icons/SakuraTree.svelte';

interface Props {
	type: string;
	status: string;
	class?: string;
}

let { type, status, class: className = '' }: Props = $props();

// Normalizing type to ensure fallback
let plantType = $derived(
	['pine', 'sakura', 'bamboo', 'fern', 'oak'].includes(type) ? type : 'pine'
);
</script>

<!-- Withered/Failed State -->
{#if status === 'failed'}
  <Branch class={className} />

<!-- Pending / Planted State -->
{:else if status === 'pending'}
  {#if plantType === 'sakura'} <SakuraSeed class={className} />
  {:else if plantType === 'bamboo'} <BambooSeed class={className} />
  {:else if plantType === 'fern'} <FernSeed class={className} />
  {:else if plantType === 'oak'} <OakSeed class={className} />
  {:else} <PineSeed class={className} />
  {/if}

<!-- Processing / Sprouting State -->
{:else if status === 'processing'}
  {#if plantType === 'sakura'} <SakuraSprout class={className} />
  {:else if plantType === 'bamboo'} <BambooSprout class={className} />
  {:else if plantType === 'fern'} <FernSprout class={className} />
  {:else if plantType === 'oak'} <OakSprout class={className} />
  {:else} <PineSprout class={className} />
  {/if}

<!-- Completed / Mature State (showing Sapling for now, Tree for fully grown in future?) -->
<!-- For now, let's map 'completed' to Tree for maximum satisfaction, or Sapling? 
     Let's do Tree for 'completed'. -->
{:else if status === 'completed'}
  {#if plantType === 'sakura'} <SakuraTree class={className} />
  {:else if plantType === 'bamboo'} <BambooTree class={className} />
  {:else if plantType === 'fern'} <FernTree class={className} />
  {:else if plantType === 'oak'} <OakTree class={className} />
  {:else} <PineTree class={className} />
  {/if}
{/if}
