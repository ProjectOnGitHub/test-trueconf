<template>
  <main class="main">
    <form class="configure">
      <label class="configure__label">
        Change Floors
        <input
          id="id-change-floors"
          v-model.number="numberFloors"
          type="number"
          :min="minFloors"
          class="configure__input"
          name="input-change-floors"
        />
      </label>
    </form>
    <section class="building">
      <div class="shafts">
        <shaft-list
          v-for="shaft in shafts"
          :key="shaft.id"
        >
          <shaft-list-item
            v-for="floor in floors"
            :key="floor"
          />
          <elevator-cabine
            :transform="transform"
            :class="{ elevator_flash: stateElevator === 'rest' }"
            :next-floor="nextFloor"
            :state="stateElevator"
            :direction="direction"
            @transition-start="onTransitionStart"
            @transition-end="onTransitionEnd"
          />
        </shaft-list>
      </div>
      <ul class="floors">
        <floor-item
          v-for="floor in floors"
          :key="floor"
          :floor="floor"
          :disabled="isFloorDisabled(floor)"
          :button-status="{ 'floor__button-indicator_disabled': isFloorDisabled(floor) }"
          @add-floor="addFloorToQueue(floor)"
        />
      </ul>
    </section>
  </main>
</template>

<script>
import ElevatorCabine from './components/ElevatorCabine.vue';
import FloorItem from './components/FloorItem.vue';
import ShaftList from './components/ShaftList.vue';
import ShaftListItem from './components/ShaftListItem.vue';

export default {
  components: { ElevatorCabine, ShaftListItem, ShaftList, FloorItem },
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
      stateElevator: 'ready',
      minFloors: 2
    };
  },
  computed: {
    isFloorDisabled() {
      return floor => this.queueFloors.includes(floor) && this.stateElevator !== 'ready';
    },
    direction() {
      return this.nextFloor - this.currentFloor > 0 ? '↑' : '↓';
    },

    floors() {
      return Array.from({ length: this.numberFloors }, (_, index) => index + 1);
    },
    shafts() {
      return Array.from({ length: this.numberShafts }, (_, index) => index + 1);
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
    },
    queueFloors() {
      return this.setStartFloor();
    }
  },
  created() {
    this.queueFloors.push(this.startFloor);
    this.duration = 1;
  },

  methods: {
    setStartFloor() {
      const [newStartFloor] = this.queueFloors;
      this.startFloor = newStartFloor;
    },
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
        const [, nextFloor] = this.queueFloors;
        this.nextFloor = nextFloor;
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
  @include gridable(100%);
  gap: 15px;
  box-sizing: border-box;
  padding: 15px;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 12px;
}
.configure {
  @include flexible(100%);
  flex-direction: column;
  gap: 5px;
  box-sizing: border-box;
  &__label {
    @include flexible(100%);
    align-items: center;
    gap: 10px;
  }
}

.building {
  @include gridable(100%);
  grid-template-columns: max-content 1fr;
  box-sizing: border-box;
  border: 5px solid $borderColor;
}

.shafts {
  @include flexible(100%);
  gap: 15px;
}

.floors {
  @include flexible(100%);
  flex-direction: column-reverse;
  @include unmarkedList;
  @include floorHeigth;
  box-sizing: border-box;
  border-left: 5px solid $borderColor;
}
</style>
