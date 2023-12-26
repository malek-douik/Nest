<script>
    import "../app.css";
    import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

    export let data
  let { supabase, session } = data
  $: ({ supabase, session } = data)

  onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});

	async function logout() {
		await supabase.auth.signOut();
	}
  </script>

{#if session}
  <button on:click={logout}>Logout</button>
{:else}
  <a href="/login">Login</a>
{/if}
  
  <slot />