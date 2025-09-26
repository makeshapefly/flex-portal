<script lang="ts">
    import { signOut } from "firebase/auth";
    import { auth } from "$lib/firebase/firebase.js";
    //import { userState } from "$lib/state/user.svelte";
    import { goto } from "$app/navigation";
    import type { WebUser } from "$lib/types/webUser";

    const signOutButtonPressed = () => {
        signOut(auth)
            .then(function () {
                // Sign-out successful.
               /* let webUser: WebUser = userState.get()
                webUser.id = null
                webUser.email = null
                webUser.name = null
                webUser.firebaseUser = null */
                goto('/auth-signin-basic');
            })
            .catch(function (error) {
                // An error happened.
            });
    };
</script>

<span onclick={signOutButtonPressed}>Logout</span>
