<template>
  <main class="main">
    <div class="building">
      <div class="elevators">
        <ul
          v-for="shaft in numberOfShafts"
          :key="shaft"
          class="elevators__shaft"
        >
          <li
            v-for="floor in floors"
            :key="floor"
            class="elevators__shaft-item"
          ></li>
          <div
            class="elevator"
            style="bottom: 0"
          ></div>
        </ul>
      </div>
      <ul class="floors">
        <li
          v-for="floor in floors"
          :key="floor"
          class="floor"
        >
          <div class="floor__container">
            <span class="floor__number">
              {{ floor }}
            </span>
            <button class="floor__button">
              <span class="floor__button-indicator"></span>
            </button>
          </div>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      numberOfFloors: 5,
      numberOfShafts: 1
    };
  },
  computed: {
    floors() {
      return Array.from({ length: this.numberOfFloors }, (_, index) => index + 1).reverse();
    }
  }
};
</script>

<style lang="scss" scoped></style>
