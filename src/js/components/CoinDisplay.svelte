<script>
  import { onMount } from 'svelte';
  import { getCoins } from '../utils';

  let coins = 0; // Default to 0 coins if no data is available

  onMount(async () => {
    coins = await getCoins(); // Fetch the coins from Supabase
  });
</script>

<div class="coinContainer">
  <!-- Coin Display Bar -->
  <div class="coinBar">
    <div class="coinInfo">
      <img class="coinImg" src="/images/coin.webp" alt="Coin Icon" />
      <!-- Only display coins if they are set (i.e., not 0) -->
      <span class="coinAmount">{coins !== null ? coins : 0}</span>
    </div>
  </div>
</div>

<style>
  .coinContainer {
    display: flex;
    flex-direction: column;
  }

  .coinBar {
    margin-right: 15px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .coinInfo {
    font-size: 18px;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .coinImg {
    width: 24px;
    height: 24px;
  }
</style>
