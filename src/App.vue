<template>
  <main class="main">
    <the-form-configure @click-to-button="setDefaultSettings">
      <form-configure-input
        v-model.number="numberFloors"
        id-name="id-change-floors"
        label-name="Change Floors"
        :min-value="minFloors"
        :number="numberFloors"
        input-name="input-change-floors"
      />
    </the-form-configure>
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
import FormConfigureInput from './components/FormConfigureInput.vue';
import ShaftList from './components/ShaftList.vue';
import ShaftListItem from './components/ShaftListItem.vue';
import TheFormConfigure from './components/TheFormConfigure.vue';

export default {
  components: {
    ElevatorCabine,
    ShaftListItem,
    ShaftList,
    FloorItem,
    TheFormConfigure,
    FormConfigureInput
  },
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
        this.$store.dispatch('setPropertyValue', { property: 'numberFloors', value: number });
      },
      get() {
        this.$store.dispatch('getPropertyValue', 'numberFloors');
        return this.$store.state.numberFloors;
      }
    },
    numberShafts: {
      set(number) {
        this.$store.dispatch('setPropertyValue', { property: 'numberShafts', value: number });
      },
      get() {
        this.$store.dispatch('getPropertyValue', 'numberShafts');
        return this.$store.state.numberShafts;
      }
    },
    currentFloor: {
      set(number) {
        this.$store.dispatch('setPropertyValue', { property: 'currentFloor', value: number });
      },
      get() {
        this.$store.dispatch('getPropertyValue', 'currentFloor');
        return this.$store.state.currentFloor;
      }
    },
    nextFloor: {
      set(number) {
        this.$store.dispatch('setPropertyValue', { property: 'nextFloor', value: number });
      },
      get() {
        this.$store.dispatch('getPropertyValue', 'nextFloor');
        return this.$store.state.nextFloor;
      }
    },
    step: {
      set(number) {
        this.$store.dispatch('setPropertyValue', { property: 'step', value: number });
      },
      get() {
        this.$store.dispatch('getPropertyValue', 'step');
        return this.$store.state.step;
      }
    },
    queueFloors: {
      set(array) {
        this.$store.dispatch('setPropertyArray', { property: 'queueFloors', array });
      },
      get() {
        this.$store.dispatch('getPropertyArray', 'queueFloors');
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
      return this.generateNumbersArray(this.numberFloors);
    },
    shafts() {
      return this.generateNumbersArray(this.numberShafts);
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
    generateNumbersArray(number) {
      return Array.from({ length: number }, (_, index) => index + 1);
    },
    setDefaultSettings() {
      window.localStorage.clear();
    },
    addLocalStorage() {
      const stateProperty = Object.keys(this.$store.state).filter(key => key !== 'queueFloors');
      stateProperty.forEach(property => {
        this.$store.dispatch('getPropertyValue', property);
      });
      this.$store.dispatch('getPropertyArray', 'queueFloors');
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
