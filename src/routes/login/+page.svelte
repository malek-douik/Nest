<!-- // src/routes/login/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<form action="?/login&provider=github" method="post" use:enhance>
	<button type="submit">Github</button>
</form>
