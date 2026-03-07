<script lang="ts">
	let count = $state(0);
</script>

<button class="counter-btn" onclick={() => count++}>
	Host counter: {count}
</button>

<style>
	.counter-btn {
		margin-top: 11px;
		background-color: #f6b352;
		border: none;
		border-radius: 0.19rem;
		font-weight: 700;
		font-size: 12px;
		padding: 0.375rem 1.125rem;
		color: #181818;
		cursor: pointer;
	}
</style>
