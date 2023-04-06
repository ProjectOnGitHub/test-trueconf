<template>
  <main class="main">
    <div class="building">
      <div class="elevators">
        <ul
          v-for="shaft in numberShafts"
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
            :style="transform"
            :class="{ elevator_flash: stateElevator === 'rest' }"
            @transitionstart="onTransitionStart"
            @transitionend="onTransitionEnd"
          >
            <div class="elevator__display">
              <span class="elevator__display-floor">{{ nextFloor }}</span>
              <span
                v-if="stateElevator !== 'move'"
                class="elevator__display-direction"
                >⊙</span
              >
              <span
                v-else
                class="elevator__display-direction"
                >{{ direction }}</span
              >
            </div>
          </div>
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
            <button
              class="floor__button"
              @click="addFloorToQueue(floor)"
            >
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
      numberFloors: 5,
      numberShafts: 1,
      currentFloor: null,
      nextFloor: 1,
      startFloor: 1,
      queueFloors: [],
      step: 0,
      duration: null,
      stateElevator: 'ready'
    };
  },
  computed: {
    direction() {
      return this.nextFloor - this.currentFloor > 0 ? '↑' : '↓';
    },
    floors() {
      return Array.from({ length: this.numberFloors }, (_, index) => index + 1);
    },
    transform() {
      return {
        transform: `translateY(${-this.step * 100}%)`,
        transition: `all ${this.duration}s linear 0s`
      };
    }
  },
  watch: {
    stateElevator() {
      if (this.stateElevator === 'ready') {
        this.moveElevator();
      }
    }
  },
  created() {
    this.queueFloors.push(this.startFloor);
    this.duration = 1;
  },
  methods: {
    addFloorToQueue(floor) {
      if (!this.queueFloors.includes(floor)) {
        this.queueFloors.push(floor);
      }
      if (this.stateElevator === 'ready') {
        this.moveElevator();
      }
    },

    moveElevator() {
      if (this.queueFloors.length > 1) {
        this.nextFloor = this.queueFloors[1];
        this.currentFloor = this.queueFloors.shift();
        this.step = this.nextFloor - 1;
        this.duration = Math.abs(this.currentFloor - this.nextFloor);
      }
    },
    onTransitionStart() {
      this.stateElevator = 'move';
    },
    onTransitionEnd() {
      setTimeout(() => {
        this.stateElevator = 'ready';
      }, 3000);
      this.stateElevator = 'rest';
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
    @include flexible(100%);
    @include unmarkedList;
    flex-direction: column-reverse;
    border-left: 1px solid $borderColor;
    border-right: 1px solid $borderColor;
    position: relative;
    &-item {
      height: $floorHeight;
      width: $shaftWidth;
      box-sizing: border-box;
      border-bottom: 1px solid $borderColor;
      &:first-child {
        border-bottom: none;
      }
    }
  }
}

.elevator {
  @include flexible(100%);
  justify-content: center;
  width: $shaftWidth;
  height: $floorHeight;
  position: absolute;
  background-color: $elevatorColor;
  padding: 5px;
  box-sizing: border-box;
  &_flash {
    animation: flash 3s linear infinite;
  }
  &__display {
    @include flexible(max-content);
    background-color: $displayColor;
    color: $textColor;
    font-weight: bold;
    height: max-content;
    box-sizing: border-box;
    border-radius: 3px;
    padding: 5px;
    gap: 10px;
    align-items: center;
  }
}

@keyframes flash {
  0% {
    opacity: 1;
  }
  25% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

.floors {
  @include flexible(100%);
  flex-direction: column-reverse;
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
  &:first-child {
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
