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
            :style="elevatorMove"
            :class="{ elevator_flash: stateElevator === 'rest' }"
            @transitionstart="onTransitionStart"
            @transitionend="onTransitionEnd"
          >
            {{ startFloor }}
            {{ stateElevator }}
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
              @click="clickButton(floor)"
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
      startFloor: 1,
      queueFloors: [],
      step: 0,
      duration: null,
      stateElevator: 'ready'
    };
  },
  computed: {
    floors() {
      return Array.from({ length: this.numberFloors }, (_, index) => index + 1);
    },
    elevatorMove() {
      return {
        transform: `translateY(${-this.step * 100}%)`,
        transition: `all ${this.duration}s linear 0s`
      };
    }
  },
  watch: {
    queueFloors() {
      if (this.stateElevator === 'ready') {
        this.queueFloors.forEach((currentFloor, i, array) => {
          this.startFloor = currentFloor;
          this.step = currentFloor - 1;
          this.duration = Math.abs(this.startFloor - array[i - 1]);
        });
      }
    }
  },
  created() {
    this.queueFloors.push(this.startFloor);
    this.duration = 1;
  },
  methods: {
    clickButton(floor) {
      if (!this.queueFloors.includes(floor)) {
        this.queueFloors.push(floor);
      }
    },
    onTransitionStart() {
      this.stateElevator = 'move';
    },
    onTransitionEnd() {
      setTimeout(() => {
        this.stateElevator = 'ready';
        this.isRest = false;
      }, 3000);
      this.stateElevator = 'rest';
      this.isRest = true;
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
  width: $shaftWidth;
  height: $floorHeight;
  position: absolute;
  background-color: $elevatorColor;
  &_flash {
    animation: flash 3s linear infinite;
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
