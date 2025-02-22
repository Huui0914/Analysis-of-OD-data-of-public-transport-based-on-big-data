<script setup>
import { onMounted, reactive, ref } from 'vue'
import HeaderBar from '../components/HeaderBar.vue'
import * as echarts from 'echarts'
import 'echarts/extension/bmap/bmap'
import { BorderBox12, Decoration11, BorderBox11 } from '@kjgl77/datav-vue3'
import hangZhouTrackJson from '@/assets/json/hangzhou-track.json'

const mapRef = ref()
onMounted(() => {
  const points = [].concat.apply(
    [],
    hangZhouTrackJson.map(function(track) {
      return track.map(function(seg) {
        return seg.coord.concat([1])
      })
    })
  )
  console.log('pointspoints', points)
  // 初始化百度地图
  const myChart = echarts.init(mapRef.value)
  myChart.setOption({
      animation: false,
      bmap: {
        center: [120.13066322374, 30.240018034923],
        zoom: 14,
        roam: true
      },
      visualMap: {
        show: false,
        top: 'top',
        min: 0,
        max: 5,
        seriesIndex: 0,
        calculable: true,
        inRange: {
          color: [
            'blue',
            'blue',
            'green',
            'yellow',
            'red'
          ]
        }
      },
      series: [
        {
          type: 'heatmap',
          coordinateSystem: 'bmap',
          data: points,
          pointSize: 5,
          blurSize: 6
        }
      ]
    }
  )
  const bmap = myChart.getModel().getComponent('bmap').getBMap()
  bmap.addControl(new BMap.MapTypeControl())
  bmap.setMapStyle({ style: 'midnight' })

  // 初始化 OD 分析图表
  odChartInstance.value = echarts.init(document.getElementById('od-chart'))
  odChartInstance.value.setOption(odOptions.value)
})

const show = ref(false)
const count = ref(0)
const sectionValue1 = ref('')
const sectionValue2 = ref('')
const schemeToggle = ref(true)

// 线网优化图表数据
const odChartInstance = ref(null)
const odOptions = ref({
  title: {
    text: '门到门全量 OD 数据',
    textStyle: {
      color: '#fff',
      fontSize: 22.5,
      fontWeight: 500
    },
    left: 'center',
    top: 15
  },
  xAxis: {
    type: 'category',
    name: '起点',
    data: ['武林广场', '龙翔桥', '杭州东站', '文三路口'],
    axisTick: { show: false },
    axisLabel: { color: '#2197d2' },
    axisLine: { show: false },
    nameTextStyle: { color: '#2197d2' }
  },
  yAxis: {
    type: 'value',
    name: '客流量',
    axisLabel: { color: '#2197d2' },
    nameTextStyle: { color: '#2197d2' },
    splitLine: {
      lineStyle: {
        color: '#3a6375'
      }
    }
  },
  series: [
    {
      name: '客流量',
      type: 'bar',
      data: [1200, 2000, 1500, 800],
      itemStyle: {
        borderRadius: [6, 6, 0, 0],
        color: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: '#2ebbe6'
          }, {
            offset: 1,
            color: 'rgba(46,187,230,0.3)'
          }],
          global: false
        }
      }
    }
  ],
  grid: { top: '30%', right: 60, bottom: '10%' }
})

// 存储模拟后的方案推荐列表
const tempItems = reactive([])
const pressureAnalysisVisible = ref(false)  // 控制交通压力分析的显示

// 交替生成不同的方案
const simulate = () => {
  count.value++
  const newScheme = schemeToggle.value
    ? {
        index: tempItems.length + 1,
        value: `
          方案 ${tempItems.length + 1}：
          基于OD数据分析得出，${sectionValue1.value} 到 ${sectionValue2.value} 之间的客流量较高，特别是在早晚高峰时段，
          建议通过以下方式进行优化：
          1. 增加公交线路，缓解高峰期间地铁运力压力。
          2. 增加共享单车投放点，鼓励短途出行方式。
          3. 调整运力配置，确保公共交通资源的高效利用。
        `
      }
    : {
        index: tempItems.length + 1,
        value: `
          方案 ${tempItems.length + 1}：
          根据潜客挖掘分析，${sectionValue1.value} 到 ${sectionValue2.value} 区域预计在未来几个月将有显著的客流增长。
          为此，建议采取以下优化措施：
          1. 增加直达线路，减少中途换乘，提高出行效率。
          2. 提前调配出租车、网约车等多种运力，预防突发客流。
          3. 根据客流预测动态调整公交和地铁班次，提升乘客出行体验。
        `
      }
  tempItems.push(newScheme)
  schemeToggle.value = !schemeToggle.value  // 切换方案
  pressureAnalysisVisible.value = true  // 模拟后展示交通压力分析
}

// 生成新的优化方案
const generateScheme = () => {
  simulate() // 调用模拟函数生成方案
}
</script>

<template>
  <header>
    <HeaderBar />
  </header>
  <div style="height: 83vh; display: flex; justify-content: center;">
    <div class="simulation-info">
      <div class="left">
        <div class="simulation-selection">
          <BorderBox12 class="simulation-form" :color="['#12637c', '#14dcdf']"
                       backgroundColor="rgba(23, 73, 102, 0.8)">
            <div style="display: flex; width: 80%; margin-bottom: 10px;">
              <h3 style="white-space: nowrap; display: flex; align-items: center;">起始路段：</h3>
              <el-select v-model="sectionValue1" placeholder="请选择起始路段" style="width: 100%;">
                <el-option v-for="o in ['武林广场', '西湖文化广场', '火车东站', '滨江高新', '文三路口']" :key="o" :label="o" :value="o"></el-option>
              </el-select>
            </div>
            <div style="display: flex; width: 80%;">
              <h3 style="white-space: nowrap; display: flex; align-items: center;">终点路段：</h3>
              <el-select v-model="sectionValue2" placeholder="请选择终点路段" style="width: 100%;">
                <el-option v-for="o in ['武林广场', '西湖文化广场', '火车东站', '滨江高新', '文三路口']" :key="o" :label="o" :value="o"></el-option>
              </el-select>
            </div>
          </BorderBox12>
          <div class="simulation-button">
            <el-button plian>重置</el-button>
            <el-button type="primary" @click="simulate">优化</el-button>
          </div>
        </div>

        <!-- OD 数据图表 -->
        <div id="od-chart" style="height: 40%;"></div>

        <div class="pressure-analysis">
          <BorderBox12 :color="['#12637c', '#14dcdf']"
                       backgroundColor="rgba(23, 73, 102, 0.8)" style="width: 100%;">
            <Decoration11 class="title-decor11" style="width: 200px;height:56px;" :color="['#12637c', '#14dcdf']">
              <b style="color:#f5cb25;font-weight: 700">交通压力分析</b>
            </Decoration11>
            <div v-if="pressureAnalysisVisible" style="padding: 1em;margin-top: -30px;">
              <p>模拟起始路段和终点路段的交通压力分析如下：</p>
              <ul>
                <li>潜客挖掘：{{ sectionValue1 }} 到 {{ sectionValue2 }} 存在潜在的客流增长点。</li>
                <li>客流预测：未来高峰期客流量将增加 20%。</li>
                <li>建议优化措施：增加运力、优化线路、提前调配公共交通资源。</li>
              </ul>
            </div>
            <div v-else style="padding: 1em;color: #aaa;text-align:center;">请选择起始路段和终点路段。</div>
          </BorderBox12>
        </div>
      </div>
      <BorderBox12 class="middle" :color="['#12637c', '#14dcdf']"
                   backgroundColor="rgba(23, 73, 102, 0.8)" style="width: 43%;padding: 8px;">
        <div id="simulation-map" ref="mapRef"></div>
      </BorderBox12>
      <div class="right flex-column">
        <BorderBox11 title="优化方案推荐" :title-width="190" :color="['#e73d76', 'rgba(190,108,135,0.35)']"
                     style="height: 180px;">
          <div style="text-align:center;padding-top: 4.2em;">
            <span style="font-size: 38px; font-weight: 600; color:  #e73d76;font-family: Impact,sans-serif">{{ count
              }}</span>
          </div>
          <div class="scheme-generation">
            <el-button text @click="generateScheme"
                       style="width: 40%; color: white; background: linear-gradient(to bottom, #f1135e, rgb(227,83,130));">
              生成新方案
            </el-button>
          </div>
        </BorderBox11>
        <div class="simulation-item flex-1">
          <div class="simulation-list">
            <el-scrollbar style="width: 100%;">
              <ul style="line-height: 1.3; overflow: hidden;">
                <li v-for="o in tempItems" :key="o.index" style="margin-top: 10px; font-size: 18px;">
                  <p style="white-space: pre-wrap;">{{ o.value }}</p>
                </li>
              </ul>
            </el-scrollbar>
          </div>
        </div>
        <!-- 插入图片 -->
        <div class="scheme-image" style="text-align:center;">
          <img src="src/assets/111.png" alt="方案相关图片"
               style="width: 100%;height:300px; margin-top: 20px;border-radius: 8px;border: 2px solid #14dcdf;">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.simulation-info {
  width: 98%;
  height: 100%;
  //background: linear-gradient(to bottom, #0e989d, #16263d);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.left {
  width: 25%;
  height: 100%;
}

.middle {
  position: relative;
  width: 43%;
  height: 100%; /* 适当调整高度 */
  overflow: hidden;
  display: flex;
  justify-content: center; /* 居中对齐 */
  align-items: center; /* 居中对齐 */
  margin: 0 1em;
}

.right {
  width: 30%;
  height: 100%;
  //background-color: #0d4b68;
  border-radius: 12px;
  background: rgba(23, 73, 102, 0.5);
}

:deep(#simulation-map .ec-extension-bmap) {
  border-radius: 8px;
}

#simulation-map {
  position: relative;
  width: 100%; /* 使地图填满父容器 */
  height: 100%; /* 使地图填满父容器 */
}

.simulation-selection {
  width: 100%;
  height: 25%;
  /* background-color: red; */
  display: flex;
  align-items: center;
}

.simulation-form {
  width: 90%;
  height: 90%;
  //border: 2px solid #049dc3;
  //border-radius: 5px;
  //background: rgba(23, 73, 102, 0.8);
}

:deep(.simulation-form .border-box-content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

:deep(.simulation-form .el-select .el-input__wrapper) {
  --el-input-bg-color: #185d8a;
  --el-input-text-color: #fff;
}

.pressure-analysis {
  height: 35%;
  padding-top: 32px;
}

.pressure-analysis .title-decor11 {
  margin-top: 0;
  transform: translateY(-24px);
}

.simulation-input {
  background-color: #377b7e;
  width: 35%;
  height: 100%;
  border-right: 2px solid #049dc3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1%;
}


.simulation-tag {
  background-color: #0e586d;
  width: 65%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.simulation-button {
  display: flex;
  /* width: 10%; */
  padding: 0 15px;
  flex-direction: column;
}

.tag-input {
  display: flex;
  white-space: nowrap;
  margin: 5% 0;
  align-items: center;
}

.section-input {
  display: flex;
  white-space: nowrap;
  margin: 5% 0;
  align-items: center;
}

.simulation-data {
  height: 75%;
  display: flex;
}

.simulation-chart {
  width: 40%;
  height: 100%;
}

.changing-trends {
  height: 50%;
}

.section-simulation {
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-right: 15px;
}

.simulation-history {
  height: 50%;
  display: flex;
  flex-direction: column;
  /* display: flex; */
  align-items: center;
}

.restriction-scheme {
  max-height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* overflow: hidden; */
}

.simulation-count {
  background-color: #84acba;
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 3px solid #e74750;
}

.simulation-item {
  display: flex;
  position: relative;
  width: 100%;
  font-size: 12px;
  padding: 0 1em;
  text-align: left;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.simulation-item li::marker {
  color: #e74750;
}

.simulation-list {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

.scheme-generation {
  display: flex;
  justify-content: center;
  margin-top: auto;
  align-items: center;
  flex: 1;
}

.el-button + .el-button {
  margin-left: 0;
  margin-top: 10px;
}

</style>
