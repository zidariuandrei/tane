<script>
let seedInput = $state('');
let isPlanting = $state(false);

async function plantSeed() {
	if (!seedInput.trim()) return;

	isPlanting = true;
	try {
		const response = await fetch('/api/seeds', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ content: seedInput }),
		});

		if (response.ok) {
			seedInput = '';
			// TODO: Refresh seed list
		}
	} catch (error) {
		console.error('Failed to plant seed:', error);
	} finally {
		isPlanting = false;
	}
}
</script>

<div class="min-h-screen">
  <!-- Header -->
  <header class="bg-white border-b border-stone-200">
    <div class="max-w-7xl mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <span class="text-3xl">🌱</span>
          <div>
            <h1 class="text-2xl font-bold text-stone-800">Tane</h1>
            <p class="text-sm text-stone-500">種 - Idea Incubator</p>
          </div>
        </div>
        <a href="/settings" class="btn-secondary">Settings</a>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="max-w-7xl mx-auto px-4 py-8">
    <!-- Seed Input -->
    <div class="card mb-8">
      <h2 class="text-lg font-semibold mb-4">Plant a New Seed</h2>
      <div class="flex gap-4">
        <input
          type="text"
          bind:value={seedInput}
          placeholder="Describe your idea in one sentence..."
          class="flex-1 px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          onkeydown={(e) => e.key === 'Enter' && plantSeed()}
        />
        <button 
          onclick={plantSeed}
          disabled={isPlanting || !seedInput.trim()}
          class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPlanting ? 'Planting...' : '🌱 Plant'}
        </button>
      </div>
      <p class="text-sm text-stone-500 mt-2">
        Example: "AI-powered app that helps people care for houseplants"
      </p>
    </div>

    <!-- Garden View Placeholder -->
    <div class="card">
      <h2 class="text-lg font-semibold mb-4">Your Garden</h2>
      <div class="h-96 bg-stone-100 rounded-lg flex items-center justify-center">
        <p class="text-stone-400">Garden visualization coming in Week 2...</p>
      </div>
    </div>
  </main>
</div>
