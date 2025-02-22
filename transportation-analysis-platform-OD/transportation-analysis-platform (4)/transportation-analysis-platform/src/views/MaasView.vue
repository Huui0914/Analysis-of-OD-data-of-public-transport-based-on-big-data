<template>
  <header>
    <HeaderBar />
  </header>
  <div id="Maas-info" class="dashboard-container">
    <!-- 左侧：运力供需匹配地图和运力供需分析图表 -->
    <div class="dashboard left-section">
      <!-- 运力供需匹配地图 -->
      <BorderBox12 class="map-center maas-box" :color="['#12637c', '#14dcdf']" backgroundColor="rgba(19,35,60,.7)">
        <Decoration11 class="title-decor11" style="width: 200px;height:56px;" :color="['#12637c', '#14dcdf']">
          运力供需匹配地图
        </Decoration11>
        <div id="bmap" class="maas-map"></div>
      </BorderBox12>
      <!-- 可达性分析 -->
      <BorderBox12 class="map-center maas-box" :color="['#12637c', '#14dcdf']" backgroundColor="rgba(19,35,60,.7)">
        <Decoration11 class="title-decor11" style="width: 200px;height:56px;" :color="['#12637c', '#14dcdf']">
          可达性分析
        </Decoration11>
        <div id="achievableMap" class="chart"></div>
      </BorderBox12>
    </div>

    <!-- 右侧：通勤期望 -->
    <div class="dashboard right-section">
      <!-- 通勤期望 -->
      <BorderBox12 class="map-center maas-box" :color="['#12637c', '#14dcdf']" backgroundColor="rgba(19,35,60,.7)">
        <Decoration11 class="title-decor11" style="width: 200px;height:56px;" :color="['#12637c', '#14dcdf']">
          通勤期望
        </Decoration11>
        <div class="content-area content-with-text">
          <!-- <img src="@/assets/commuteImg.png" alt="通勤期望图示" class="commute-image"> -->
          <div id="commuteMap" style="width: 100%; height: 100%;"></div>
        </div>
      </BorderBox12>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import 'echarts/extension/bmap/bmap'
import HeaderBar from '../components/HeaderBar.vue'
import { BorderBox12, Decoration11 } from '@kjgl77/datav-vue3'
import iconImg from '@/assets/images/locationIcon.png';
import lineData from '@/assets/json/lineData.json';
import mapstyle from '@/assets/json/custom_map_config.json';
import peopleHeatData from '@/assets/json/peopleHeatData.json';

import subwayicon from '@/assets/images/subway.png';

import fiveGeoData from "@/assets/json/5mins.json";
import tenGeoData from "@/assets/json/10mins.json";
import fifteenGeoData from "@/assets/json/15mins.json";
import twentyGeoData from "@/assets/json/20mins.json";



// 人口热力图地图初始化
let heatmap
const initHeatmap = async () => {
  heatmap = new BMapGL.Map('bmap')
  heatmap.setMapStyleV2({ styleJson: mapstyle })
  heatmap.centerAndZoom(new BMap.Point(120.171387, 30.249298), 12.5)
  heatmap.enableScrollWheelZoom(true)

  await new Promise((resolve) => {
    heatmap.addEventListener('tilesloaded', resolve)
  })

  const view = new mapvgl.View({
    map: heatmap,
  })

  // 添加人口热力图图层
  const heatmapLayer = new mapvgl.HeatmapLayer({
    size: 600, // 单个点绘制大小
    max: 75000, // 最大阈值
    height: 0, // 最大高度，默认为0
    unit: "m", // 单位，m:米，px: 像素
    gradient: {
      // 对应比例渐变色
      0.25: "rgba(0, 0, 255, 1)",
      0.55: "rgba(0, 255, 0, 1)",
      0.85: "rgba(255, 255, 0, 1)",
      1: "rgba(255, 0, 0, 1)",
    },
  })

  // 添加热力图数据
  let data = [];
  peopleHeatData.map((item) => {
    let dataItem = {
      geometry: {
        type: 'Point',
        coordinates: [item.lng, item.lat],
      },
      properties: {
        count: item.count,
      }
    };
    data.push(dataItem);
  });

  view.addLayer(heatmapLayer);
  heatmapLayer.setData(data);
}
onMounted(initHeatmap)

// 通勤地图
let commuteMap
const initCommuteMap = async () => {
  commuteMap = new BMapGL.Map('commuteMap')
  commuteMap.setMapStyleV2({ styleJson: mapstyle })
  commuteMap.centerAndZoom(new BMapGL.Point(120.171387, 30.249298), 13.8)
  commuteMap.enableScrollWheelZoom(true)
  commuteMap.setTilt(45) // 

  await new Promise((resolve) => {
    commuteMap.addEventListener('tilesloaded', resolve)
  })

  // 定义主要通勤点位（例如：居住区、商业区、学校等）
  const commutingPoints = [
    {
      name: '仓前校区',
      coordinates: [120.022723, 30.299045],
      type: 'school'
    },
    {
      name: '下沙校区',
      coordinates: [120.346887, 30.318832],
      type: 'school'
    },
    {
      name: '西湖区住宅区',
      coordinates: [120.163569, 30.234166],
      type: 'residential'
    },
    {
      name: '城站商圈',
      coordinates: [120.217881, 30.296844],
      type: 'commercial'
    },
    {
      name: '钱江新城',
      coordinates: [120.399364, 30.319904],
      type: 'commercial'
    }
  ]

  const view = new mapvgl.View({
    map: commuteMap,
  })
  const viewWithEffect = new mapvgl.View({
    map: commuteMap,
    effects: [
      new mapvgl.BrightEffect({
        threshold: 0,
        blurSize: 2,
        clarity: 1,
      }),
    ],
  })

  // 添加位置图标图层
  const iconlayer = new mapvgl.IconLayer({
    data: commutingPoints.map(point => ({
      geometry: {
        type: 'Point',
        coordinates: point.coordinates
      }
    })),
    width: 50,
    height: 50,
    icon: iconImg,
    enablePicked: true,
    selectedIndex: -1,
    selectedColor: '#FF6347',
    autoSelect: true,
    setoffset: true, // 是否设置偏移
    offset: [0, -25], // 偏移量
  })


  // 创建曲线对象数据
  let newLineData = [];
  let curve = new mapvgl.BezierCurve();
  lineData.map((item) => {
    curve.setOptions({
      start: item.geometry.coordinates[0],
      end: item.geometry.coordinates[1],
    })
    let curveModelData = curve.getPoints();
    newLineData.push({
      "geometry": {
        "type": "LineString",
        "coordinates": curveModelData
      },
      "properties": {
        "flow": item.properties.flow,
        "from": item.properties.from,
        "to": item.properties.to,
        "type": item.properties.type,
        "duration": item.properties.duration
      }
    })
  })

  // 添加通勤期望飞线图层
  const flylineLayer = new mapvgl.LineLayer({
    data: newLineData,
    width: (data) => {
      // 根据流量大小动态设置线宽
      return Math.max(2, Math.min(8, data.properties.flow / 100))
    },
    color: (data) => {
      // 根据流量设置不同颜色
      const flow = data.properties.flow
      if (flow > 700) return '#ff4d4d'
      if (flow > 500) return '#ffa64d'      // 中高流量橙色
      if (flow > 300) return '#4dffff'      // 中等流量蓝色
      return '#4db8ff'                      // 低流量浅蓝色
    },
    opacity: 0.8,
    blend: 'lighter',// 混合模式
    animation: true,
    duration: 2, // 循环时间2s
    trailLength: 0.8, // 拖尾长度占间隔的0.8
    interval: 0.2, // 粒子长度占线整体长度的0.2
  })

  view.addLayer(iconlayer)
  viewWithEffect.addLayer(flylineLayer)
}
onMounted(initCommuteMap)

// 初始化可达性分析地图
let achievableMap
const initAchievableMap = async () => {
  achievableMap = new BMapGL.Map("achievableMap");
  achievableMap.setMapStyleV2({ styleJson: mapstyle })
  achievableMap.centerAndZoom(new BMapGL.Point(120.171387, 30.249298), 13.5)
  achievableMap.enableScrollWheelZoom(true)

  await new Promise((resolve) => {
    achievableMap.addEventListener('tilesloaded', resolve)
  })

  // 创建可视化图层
  const view = new mapvgl.View({ map: achievableMap });

  const iconlayer = new mapvgl.IconLayer({
    data: [{
      geometry: {
        type: 'Point',
        coordinates: [120.15945870283241, 30.257311575147767]
      }
    }],
    width: 40,
    height: 40,
    offset: [0, - 153 / 2 / 2],
    icon: subwayicon,
    enablePicked: true, // 是否可以拾取
    selectedIndex: -1, // 选中项
    selectedColor: '#ff0000', // 选中项颜色
    autoSelect: true, // 根据鼠标位置来自动设置选中项
    onClick: (e) => { // 点击事件
      console.log(e)
    },
  });
  view.addLayer(iconlayer);

  // 创建图层datasets
  const datasets = [
    { data: twentyGeoData, color: "rgba(226, 138, 111, 0.8)" },
    { data: fifteenGeoData, color: "rgba(225, 192, 170, 0.8)" },
    { data: tenGeoData, color: "rgba(91, 155, 213, 0.8)" },
    { data: fiveGeoData, color: "rgba(0, 84, 255, 0.8)" },
  ];

  datasets.forEach((item) => {
    view.addLayer(
      new mapvgl.PolygonLayer({
        lineWidth: 0,
        fillColor: item.color,
        data: [
          {
            geometry: {
              type: "Polygon",
              coordinates: item.data.features[1].geometry.coordinates,
            },
          },
        ],
      })
    );
  });
};
onMounted(initAchievableMap)

</script>

<style scoped>
.dashboard-container {
  display: flex;
  justify-content: space-between;
  padding: 0 5%;
}

.left-section {
  width: 40%;
  /* 左侧宽度 */
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-right: 20px;
}

.right-section {
  width: 60%;
  /* 右侧宽度 */
  display: flex;
  gap: 20px;
}

.maas-box {
  height: auto;
  box-sizing: border-box;
  padding: 15px;
  margin-bottom: 1em;
}

.maas-map {
  width: 100%;
  height: 350px;
  border: 2px solid #0fa5ec;
  border-radius: 6px;
}

.chart,
.content-area {
  width: 100%;
  height: 350px;
}

.content-area {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.2em;
}

.commute-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content-with-text {
  height: 100%;
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  /* 垂直居中 */
  gap: 10px;
  /* 图片和文字之间的间距 */
}

.commute-image {
  width: 80%;
  height: 100%;
  object-fit: cover;
}

.text-description {
  flex: 1;
  /* 文字区域占用剩余空间 */
  color: #fff;
  font-size: 1em;
}
</style>
