<template>
  <main class="main">
    <the-form-configure
      v-model.number="numberFloors"
      :min-floors="minFloors"
      :number-floors="numberFloors"
      @click-to-button="setDefaultSettings"
    />
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
import TheFormConfigure from './components/TheFormConfigure.vue';

export default {
  components: { ElevatorCabine, ShaftListItem, ShaftList, FloorItem, TheFormConfigure },
  data() {
    return {
      duration: 1,
      stateElevator: 'ready',
      minFloors: 2
    };
  },
  computed: {
    numberFloors: {
      set(number) {
        this.$store.dispatch('setNumberFloors', number);
      },
      get() {
        return this.$store.state.numberFloors;
      }
    },
    numberShafts: {
      set(number) {
        this.$store.dispatch('setNumberShafts', number);
      },
      get() {
        return this.$store.state.numberShafts;
      }
    },
    currentFloor: {
      set(number) {
        this.$store.dispatch('setCurrentFloor', number);
      },
      get() {
        return this.$store.state.currentFloor;
      }
    },
    nextFloor: {
      set(number) {
        this.$store.dispatch('setNextFloor', number);
      },
      get() {
        return this.$store.state.nextFloor;
      }
    },
    step: {
      set(number) {
        this.$store.dispatch('setStep', number);
      },
      get() {
        return this.$store.state.step;
      }
    },
    queueFloors: {
      set(array) {
        this.$store.dispatch('setQueueFloors', array);
      },
      get() {
        return this.$store.state.queueFloors;
      }
    },
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
    }
  },
  created() {
    this.addLocalStorage();
  },

  methods: {
    setDefaultSettings() {
      window.localStorage.clear();
      this.addLocalStorage();
    },
    addLocalStorage() {
      if (localStorage.length === 0) {
        this.numberFloors = 5;
        this.numberShafts = 1;
        this.queueFloors = [1];
        this.currentFloor = 0;
        this.nextFloor = 1;
        this.step = 0;
      }
    },
    addFloorToQueue(floor) {
      const queue = this.queueFloors;
      if (!queue.includes(floor)) {
        queue.push(floor);
        this.queueFloors = queue;
      }
      if (this.stateElevator === 'ready') {
        this.moveElevator();
      }
    },
    moveElevator() {
      const queue = this.queueFloors;
      if (queue.length > 1) {
        const [, nextFloor] = queue;
        this.nextFloor = nextFloor;
        this.currentFloor = queue.shift();
        this.queueFloors = queue;
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
