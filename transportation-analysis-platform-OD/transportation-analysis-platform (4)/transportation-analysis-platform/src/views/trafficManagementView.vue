<script setup>
import restrictedSections from '@/assets/restricted-sections.json'
import { BorderBox11, BorderBox12, BorderBox13, Decoration1, Decoration3 } from '@kjgl77/datav-vue3'

import 'echarts/extension/bmap/bmap'
import HeaderBar from '../components/HeaderBar.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import video1 from '@/assets/traffic1.png'
import video2 from '@/assets/traffic2.png'
import longxiangqiao_resource from '@/assets/longxiangqiao_resource.png'
import longxiangqiao_output from '@/assets/longxiangqiao_output.png'
import chengzhan_resource from '@/assets/chengzhan_resource.png'
import chengzhan_output from '@/assets/chengzhan_output.png'

import { format } from 'echarts/core'

const route = useRoute()
const locationX = ref()
const locationY = ref()
const section = ref(route.query.section)
restrictedSections.forEach((item) => {
  if (item.section === section.value) {
    locationX.value = item.locationX
    locationY.value = item.locationY
  }
})
onMounted(() => {
  const map = new BMap.Map('center-map')
  map.setMapStyle({ style: 'midnight' })
  if (locationX.value !== undefined && locationY.value !== undefined) {
    map.centerAndZoom(new BMap.Point(locationX.value, locationY.value), 17)
  } else {
    map.centerAndZoom(new BMap.Point(120.171387, 30.249298), 17)
  }
  var traffic = new BMap.TrafficLayer()
  map.addTileLayer(traffic)
  map.enableScrollWheelZoom(true)
})

//区域内车流量变化趋势
const areaTrafficOption = ref({
  title: {
    text: '',
    textStyle: {
      color: '#fff',
      fontSize: 22.5,
      fontWeight: 500
    },
    left: 'center',
    top: 5
  },
  xAxis: {
    type: 'category',
    name: '时间/h',
    data: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22'],
    axisTick: {
      show: false // 隐藏刻度线
    },
    axisLabel: {
      color: '#59b8bb'
    },
    axisLine: {
      show: false // 隐藏坐标轴线
    },
    nameLocation: 'middle',
    nameTextStyle: {
      color: '#59b8bb',
      padding: [10, -180, 0, 0]
    }
  },
  yAxis: {
    type: 'value',
    name: '车流量/百万',
    data: [0, 1, 2, 3, 4, 5, 6],
    axisLabel: {
      color: '#59b8bb'
    },
    splitLine: {
      lineStyle: {
        color: '#3a6375' // 分割线颜色为白色
      }
    },
    axisPointer: {
      snap: true
    },
    nameLocation: 'end',
    nameTextStyle: {
      color: '#59b8bb'
    }
  },
  series: [
    {
      type: 'line',
      smooth: true,
      data: [4, 3, 2, 2.5, 5, 4, 3.5, 2.5, 4, 5, 3.5, 1],
      color: '#fdc50b'
    }
  ],
  grid: {
    top: '35%',
    right: 30,
    left: 50,
    bottom: 50
  }
})

//区域内车辆情况统计
const areaStatisticsOption = ref({
  title: {
    text: '区域内车辆状态统计',
    left: '30px',
    textStyle: {
      color: '#fff',
      fontSize: 19,
      fontWeight: 500
    }
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'right',
    textStyle: {
      color: '#fff'
    },
    padding: 25
  },
  color: ['#f1347c', '#043654', '#2876a6', '#f794ba'],
  series: [
    {
      type: 'pie',
      center: ['50%', '60%'],
      radius: ['45%', '65%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold',
          color: '#fff'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: '小型汽车' },
        { value: 735, name: '中型汽车' },
        { value: 580, name: '大型汽车' },
        { value: 484, name: '学生校车' }
      ]
    }
  ]
})

//车辆流入/出曲线图
const option2 = ref({
  title: {
    text: '车辆流入/出曲线图',
    textStyle: {
      color: '#fff',
      fontSize: 19,
      fontWeight: 500
    },
    left: '30px',
    top: 5
  },
  legend: {
    data: ['流入', '流出'],
    textStyle: {
      color: '#2197d2'
    },
    padding: 40
  },
  xAxis: {
    type: 'category',
    name: '时间/h',
    data: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22'],
    axisTick: {
      show: false // 隐藏刻度线
    },
    axisLabel: {
      color: '#2197d2'
    },
    axisLine: {
      show: false // 隐藏坐标轴线
    },
    nameTextStyle: {
      color: '#2197d2'
    }
  },
  yAxis: {
    type: 'value',
    name: '车流量/百万',
    data: [0, 1, 2, 3, 4, 5, 6],
    axisLabel: {
      color: '#2197d2'
    },
    nameTextStyle: {
      color: '#2197d2'
    },
    splitLine: {
      lineStyle: {
        color: '#3a6375' // 分割线颜色为白色
      }
    }
  },
  series: [
    {
      name: '流入',
      type: 'line',
      smooth: true,
      data: [3, 2, 1.5, 2.5, 4, 5, 4, 3.5, 4, 5, 4, 3.5],
      color: '#f1347c'
    }, {
      name: '流出',
      type: 'line',
      smooth: true,
      data: [3.5, 1, 2, 2.5, 3, 1, 3, 1, 4, 4.5, 2, 4],
      color: '#22a8dc'
    }
  ],
  grid: {
    top: '30%',
    right: 60,
    bottom: '10%'
  }
})

const searchQuery = ref('')
const currentSourceImage = ref(longxiangqiao_resource)
const currentOutputImage = ref(longxiangqiao_output)
const errorMessage = ref('') 

// 定义每个站点的图片
const images = {
  龙翔桥: {
    source: longxiangqiao_resource,
    output: longxiangqiao_output,
    chartData: [
      { product: '西湖风景区', 来源: 43.3, 输出: 85.8 },
      { product: '湖滨银泰in77', 来源: 83.1, 输出: 73.4 },
      { product: '工联cc', 来源: 86.4, 输出: 65.2 },
    ]
  },
  城站: {
    source: chengzhan_resource,
    output: chengzhan_output,
    chartData: [
      { product: '市三人民', 来源: 43.3, 输出: 85.8 },
      { product: '浙大附属第一医院', 来源: 83.1, 输出: 73.4 },
      { product: '杭州站', 来源: 86.4, 输出: 65.2 },
    ]
  },
}

function handleSearch() {
  const station = searchQuery.value.trim()
  if (images[station]) {
    // 更新图片
    currentSourceImage.value = images[station].source
    currentOutputImage.value = images[station].output
  } else {
    alert("未找到该地铁站的图片或图表数据，请检查输入。")
  }
}
</script>

<template>
  <header>
    <HeaderBar />
  </header>
  <div style="height: 83vh; display: flex; justify-content: center;">
    <div class="heat-map">
      <!-- 左侧栏 -->
      <div class="left flex-column">
        <BorderBox11 title="区域内车流量变化趋势" :title-width="240" :color="['#6fe4e7', '#3ca2c2']" style="height: 35%;">
          <v-chart :option="areaTrafficOption"></v-chart>
        </BorderBox11>
        <BorderBox13 class="flex-1 mt-1" :color="['#3ca2c2','#14dcdf' ]" style="padding-top: 20px;box-sizing:border-box;height: auto;">
          <div style="height: 30px;width:20px;margin-left: 12px;overflow: hidden">
            <Decoration3 style="width: 200px;height: 30px;" />
          </div>
          <div style="height: 50%;margin-top: -30px;">
            <v-chart :option="areaStatisticsOption"></v-chart>
          </div>
          <div style="height: 30px;width:20px;margin-left: 12px;overflow: hidden">
            <Decoration3 style="width: 200px;height: 30px;" />
          </div>
          <div style="height:50%;margin-top: -34px;">
            <v-chart :option="option2"></v-chart>
          </div>
        </BorderBox13>
      </div>
      <!-- 中间栏 -->
      <BorderBox12 class="map-center" :color="['#12637c', '#14dcdf']">
        <div class="middle" id="center-map"></div>
      </BorderBox12>
      <!-- 右侧栏 -->
      <div class="right">
        <h2 class="right-title flex">
          <Decoration1 style="width: 100px; height: 30px;" />
            <span class="mr-1 ml-1">流量来源/流出对比</span>
          <Decoration1 style="width: 100px; height: 30px; transform: rotate(-1deg);" />
        </h2>
        <BorderBox12 class="box-right" :color="['#12637c', '#14dcdf']">
          <div class="search-bar">
            <input type="text" placeholder="请输入要查询的地铁站" v-model="searchQuery" class="search-input"/>
            <button @click="handleSearch" class="search-button">搜索</button>
          </div>
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
          <div class="box-right__content">
            <img :src="currentSourceImage" alt="客流来源" />
            <p class="caption">客流来源</p>
            <img :src="currentOutputImage" alt="客流输出" />
            <p class="caption">客流输出</p>
          </div>
        </BorderBox12>
      </div>
    </div>
  </div>
</template>


<style scoped>
.heat-map {
  width: 98%;
  height: 100%;
  /*background: linear-gradient(to bottom, #0e989d, #16263d);*/
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
  /* border: 2px solid #000; */
}

.left,
.middle,
.right {
  height: 100%;
}

.left {
  width: 30%;
  overflow: hidden;
}

.right {
  width: 30%;
  overflow: hidden;
}

.right-title {
  width: 100%;
  height: 40px;
  text-align: center;
  justify-content: center;
  font-weight: 500;
}

.right-title span {
  line-height: 24px;
}

.right {
  position: relative;
  display: flex;
  flex-direction: column;
}

.box-right {
  box-sizing: border-box;
  flex: 1;
  height: 0;
  width: 100%;
  padding: 10px;
}

.box-right + .box-right {
  margin-top: 1em;
}

.box-right__content img {
  width: 95%;
  height: 100%;
  object-fit: cover;
}

.caption {
  font-size: 25px;
  color:white;
}

.box-right {
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
}
.search-bar {
  display: flex;
  align-items: center; 
  margin-bottom: 16px;
  width: 100%; 
}
.search-input {
  padding: 8px;
  width: 400px;
  margin-left: 16px;
  margin-right: 8px;
}
.search-button {
  padding: 8px 16px;
}

.map-center {
  box-sizing: border-box;
  margin: 0 1em;
  width: 35%;
  height: 100%;
  padding: 7px;
}

.box-right {

}

.middle {
  border-radius: 8px;
  width: 100%;
}

.bar-chart-container {
  width: 100%;
  height: 300px;
  margin-top: 10px;
}
</style>
