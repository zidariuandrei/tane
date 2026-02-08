export function parseMarkdown(text: string): string {
	if (!text) return '';

	// Escape HTML to prevent injection of raw scripts, but we'll re-add tags we want.
	// For MVP of a personal tool, we'll trust the input (from our own agent)
	// but basically we want to replace markdown syntax with HTML.

	let html = text
		// Headers
		.replace(
			/^# (.*$)/gim,
			'<h1 class="text-3xl font-heading mb-4 text-[var(--sage-fresh)]">$1</h1>'
		)
		.replace(
			/^## (.*$)/gim,
			'<h2 class="text-2xl font-heading mb-3 mt-6 text-[var(--sage-dried)]">$1</h2>'
		)
		.replace(
			/^### (.*$)/gim,
			'<h3 class="text-xl font-heading mb-2 mt-4 text-[var(--color-ink-light)]">$1</h3>'
		)

		// Bold
		.replace(
			/\*\*(.*?)\*\*/gim,
			'<strong class="font-bold text-[var(--color-ink-light)]">$1</strong>'
		)

		// Italic
		.replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>')

		// Links
		.replace(
			/\[(.*?)\]\((.*?)\)/gim,
			'<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[var(--sepia-light)] hover:underline decoration-1 underline-offset-2">$1</a>'
		)

		// Lists (Unordered) - Simple replacement for lines starting with "- "
		.replace(
			/^- (.*$)/gim,
			'<li class="ml-4 list-disc pl-2 marker:text-[var(--sage-dried)]">$1</li>'
		);

	// Paragraphs: Wrap lines that aren't headers/list items in <p>
	// This is a naive parser. A better way for lines:
	html = html
		.split('\n')
		.map((line) => {
			if (line.match(/^<h/)) return line;
			if (line.match(/^<li/)) return `<ul class="list-outside ml-4 mb-2">${line}</ul>`;
			if (line.trim() === '') return '<br>';
			return `<p class="mb-2 leading-relaxed opacity-90">${line}</p>`;
		})
		.join('');

	// Fix adjacent <ul> tags
	html = html.replace(/<\/ul><ul[^>]*>/g, '');

	return html;
}
