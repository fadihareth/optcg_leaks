<script lang="ts" generics="T extends string">
	import { Select } from 'bits-ui';

	type Option = {
		value: T;
		label: string;
	};

	let {
		options,
		value = $bindable<T | undefined>(),
		placeholder = 'Select...',
		disabled = false,
        customClass = '',
        onChange
	}: {
		options: Option[];
		value?: T;
		placeholder?: string;
		disabled?: boolean;
        customClass?: string;
        onChange?: (value: T | undefined) => void;
	} = $props();

    let selectedLabel = $derived(
		options.find((option) => option.value === value)?.label
	);

    function handleChange(newValue: string | undefined) {
		value = newValue as T | undefined;
		onChange?.(value);
	}
</script>

<Select.Root
	type="single"
	value={value}
	onValueChange={handleChange}
	{disabled}
>
	<Select.Trigger
        class={`${customClass} bg-theme! border-white/10! flex w-full items-center justify-between rounded-lg border px-3 py-2.5 transition-colors hover:border-white/20! focus:outline-none focus:ring-2 focus:ring-white/10 z-10`}
    >
		<Select.Value class="truncate">
			{selectedLabel ?? placeholder}
		</Select.Value>

        <svg
			class="ml-2 size-4 shrink-0 opacity-60"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
		>
			<path d="m6 9 6 6 6-6" />
		</svg>
	</Select.Trigger>

	<Select.Content
        class="bg-theme-dark! z-50 mt-1 w-(--bits-select-anchor-width) overflow-hidden rounded-lg border border-white/10 shadow-xl shadow-black/20"
    >
		<Select.Viewport>
			{#each options as option}
				<Select.Item
                    class="relative flex w-full cursor-pointer select-none items-center rounded-md px-3 py-2.5 outline-none transition-colors data-highlighted:bg-white/10 data-highlighted:text-white"
                    value={option.value}
                >
                    <span class="truncate">
					    {option.label}
                    </span>
				</Select.Item>
			{/each}
		</Select.Viewport>
	</Select.Content>
</Select.Root>
