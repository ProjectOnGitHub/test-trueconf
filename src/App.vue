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

<style lang="scss" scoped>
.main {
  box-sizing: border-box;
  padding: 15px;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 12px;
}
.building {
  @include gridable(100%);
  grid-template-columns: max-content 1fr;
  box-sizing: border-box;
  border: 5px solid $borderColor;
}
.elevators {
  @include flexible(100%);
  gap: 15px;
  &__shaft {
    @include gridable(100%);
    @include unmarkedList;
    border-left: 1px solid $borderColor;
    border-right: 1px solid $borderColor;
    position: relative;
    &-item {
      height: $floorHeight;
      width: $shaftWidth;
      box-sizing: border-box;
      border-bottom: 1px solid $borderColor;
      &:last-child {
        border-bottom: none;
      }
    }
  }
}

.elevator {
  width: $shaftWidth;
  height: $floorHeight;
  position: absolute;
  background-color: $elevatorColor;
  transition: 1s ease-in-out;
}

.floors {
  @include gridable(100%);
  @include unmarkedList;
  @include floorHeigth;
  box-sizing: border-box;
  border-left: 5px solid $borderColor;
}
.floor {
  @include gridable(100%);
  align-items: center;
  height: $floorHeight;
  box-sizing: border-box;
  border-bottom: 1px solid $borderColor;
  padding-left: 10px;
  &:last-child {
    border-bottom: none;
  }
  &__container {
    @include gridable(max-content);
    gap: 5px;
  }
  &__button {
    @include flexible(20px);
    @include button;
    height: 20px;
    border: 1px solid $borderColor;
    border-radius: 3px;
    &-indicator {
      height: 10px;
      width: 10px;
      border-radius: 50%;
      box-sizing: border-box;
      border: 1px solid $borderColor;
      background-color: rgba($buttonColorDefault, 0.5);
      &_active {
        background-color: rgba($buttonColorActive, 0.5);
      }
    }
  }
}
</style>
