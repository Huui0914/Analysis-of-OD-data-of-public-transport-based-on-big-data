<script setup>
import 'echarts/extension/bmap/bmap'
import HeaderBar from '../components/HeaderBar.vue'
import { ref, onMounted, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import VChart from 'vue-echarts'
import { BorderBox12 } from '@kjgl77/datav-vue3'

// const router = useRouter()
// var map
onMounted(() => {
  // 初始化地图
  var map1 = new BMap.Map('center-map'); 
  map1.setMapStyle({ style: 'midnight' })
  map1.centerAndZoom(new BMap.Point(120.17, 30.26), 20)
  // var traffic = new BMap.TrafficLayer(); // 创建交通流量图层
  // map1.addTileLayer(traffic); // 将交通流量图层添加到地图
  map1.enableScrollWheelZoom(true) // 启用滚轮缩放

  // 确保地图加载完成后才进行其他操作
  map1.addEventListener('tilesloaded', () => {
    console.log("地图加载完成")
  });

  nextTick(() => {
    window.dispatchEvent(new Event('resize'))
  })
  
  // 显示杭州地铁站位置
  var localSearch = new BMap.LocalSearch(map1, {
    renderOptions: { map: map1 },
    onSearchComplete: function(results) {
      if (localSearch.getStatus() == BMAP_STATUS_SUCCESS) {
        for (var i = 0; i < results.getCurrentNumPois(); i++) {
          if (results.getPoi(i).type == BMAP_POI_TYPE_SUBWAY_STATION) {
            map1.addOverlay(new BMap.Marker(results.getPoi(i).point));
          }
        }
      }
    }
  });
  localSearch.search("地铁站");
})

//地铁站运力不足情况数据
const congestionData = {
  "2022-11-15": {
    "龙翔桥": {
      times: ['8:00-9:00','7:00-8:00','12:00-13:00', '17:00-18:00', '18:00-19:00'],
      people: [24092, 25092, 26987, 27092, 28901],
      capacity: [16807, 16141, 19294, 23438, 20901]
    },
    "凤起路": {
      times: ['7:00-8:00', '8:00-9:00', '17:00-18:00', '18:00-19:00', '19:00-20:00'],
      people: [22111, 23512, 24511, 25098, 26123],
      capacity: [18231, 19980, 20245, 21765, 22009]
    },
    "杭州东站": {
      times: ['18:00-19:00', '17:00-18:00', '12:00-13:00', '13:00-14:00', '7:00-8:00'],
      people: [21001, 22023, 23123, 24098, 25123],
      capacity: [17123, 18345, 19210, 20010, 21890]
    }
  },
  "2022-11-14": {
    "龙翔桥": {
      times: ['8:00-9:00','18:00-19:00','12:00-13:00', '17:00-18:00', '18:00-19:00'],
      people: [22192, 22092, 23987, 25092, 27901],
      capacity: [17807, 16101, 18294, 21438, 22901]
    },
    "凤起路": {
      times: ['7:00-8:00', '8:00-9:00', '17:00-18:00', '18:00-19:00', '19:00-20:00'],
      people: [20911, 23412, 24121, 25156, 27103],
      capacity: [17231, 20909, 23215, 21908, 23109]
    },
    "杭州东站": {
      times: ['8:00-9:00', '12:00-13:00', '17:00-18:00', '18:00-19:00', '7:00-8:00'],
      people: [24001, 24023, 25765, 26798, 27123],
      capacity: [21123, 21345, 21210, 21010, 20890]
    }
  },
  "2022-11-13": {
    "龙翔桥": {
      times: ['8:00-9:00','18:00-19:00','12:00-13:00', '17:00-18:00', '18:00-19:00'],
      people: [23092, 25092, 26987, 27092, 28901],
      capacity: [17807, 17141, 18294, 24438, 21901]
    },
    "凤起路": {
      times: ['7:00-8:00', '8:00-9:00', '17:00-18:00', '18:00-19:00', '19:00-20:00'],
      people: [21109, 23562, 24011, 25178, 25433],
      capacity: [18201, 10970, 21995, 20875, 23189]
    },
    "杭州东站": {
      times: ['8:00-9:00', '12:00-13:00', '17:00-18:00', '18:00-19:00', '7:00-8:00'],
      people: [22601, 23023, 23123, 24878, 25565],
      capacity: [20123, 20345, 20210, 21010, 20890]
    }
  },
};
// 地铁站运力不足情况top5
const congestionOption = ref({
  title: {
    text: '龙翔桥地铁站运力不足时段Top5',
    left: 'center', 
    textStyle: {
      color: '#fff',
      fontSize: 15,
    },
    top: '5%'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '4%', 
    right: '4%',
    top: '15%',
    bottom: '4%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01],
    axisLabel: {
      fontSize: 10 
    }
  },
  yAxis: {
    type: 'category',
    data: ['8:00-9:00','7:00-8:00','12:00-13:00', '17:00-18:00', '18:00-19:00'],
    axisLabel: {
      fontSize: 12 
    }
  },
  series: [
    {
      name: '出行人数',
      type: 'bar',
      barWidth: '30%', // 缩小柱状图的宽度
      itemStyle: {
        color: '#ee6666' 
      },
      data: [24092, 25092, 26987, 27092, 28901]
    },
    {
      name: '车辆可承载人数',
      type: 'bar',
      barWidth: '30%', // 缩小柱状图的宽度
       itemStyle: {
        color: '#73c0de' 
      },
      data: [16807, 16141, 19294, 23438, 20901]
    }
  ]
});

//地铁站运力过剩情况数据
const excessData = { 
  "2022-11-15": {
    "龙翔桥": {
      times: ['15:00-16:00','14:00-15:00','22:00-23:00', '10:00-11:00', '5:00-6:00'],
      people: [18911, 16350, 16090, 17009, 17901.4],
      capacity: [19497.9,19744.0,19230.9,19034.8,20497.9]
    },
    "凤起路": {
      times: ['6:00-7:00', '22:00-2300', '10:00-11:00', '14:00-15:00', '5:00-6:00'],
      people: [16512, 16087, 15912, 15097, 13512],
      capacity: [18761, 19761, 18909, 19872, 20013]
    },
    "杭州东站": {
      times: ['22:00-23:00', '6:00-7:00', '10:00-11:00', '14:00-15:00', '5:00-6:00'],
      people: [21999, 25456, 23023, 23156, 25475],
      capacity: [23899, 25990, 25356, 26876, 29198]
    }
  },
  "2022-11-14": {
    "龙翔桥": {
      times: ['15:00-16:00','14:00-15:00','22:00-23:00', '10:00-11:00', '5:00-6:00'],
      people: [18119, 16876, 16843, 17119, 17987.4],
      capacity: [19187.9,18763.0,18631.9,19541.8,20112.9]
    },
    "凤起路": {
      times: ['6:00-7:00', '22:00-2300', '10:00-11:00', '14:00-15:00', '5:00-6:00'],
      people: [16528, 16087, 16912, 16097, 15512],
      capacity: [18094, 19161, 19009, 18907, 20123]
    },
    "杭州东站": {
      times: ['22:00-23:00', '6:00-7:00', '10:00-11:00', '14:00-15:00', '5:00-6:00'],
      people: [22099, 25681, 23023, 23156, 25475],
      capacity: [24899, 26087, 25356, 26876, 29198]
    }
  },
  "2022-11-13": {
    "龙翔桥": {
      times: ['15:00-16:00','14:00-15:00','22:00-23:00', '10:00-11:00', '5:00-6:00'],
      people: [18911, 17950, 17190, 16979, 18114.4],
      capacity: [19497.9,19654.1,18930.9,18034.8,19497.9]
    },
    "凤起路": {
      times: ['6:00-7:00', '22:00-2300', '10:00-11:00', '14:00-15:00', '5:00-6:00'],
      people: [16999, 16321, 15906, 15667, 14512],
      capacity: [18761, 18761, 18056, 18872, 19013]
    },
    "杭州东站": {
      times: ['22:00-23:00', '6:00-7:00', '10:00-11:00', '14:00-15:00', '5:00-6:00'],
      people: [22087, 25456, 23023, 24556, 26475],
      capacity: [24576, 26990, 26356, 27876, 30198]
    }
  }
}
// 地铁站运力过剩情况Top5
const excessOption = ref({
  title: {
    text: '龙翔桥地铁站运力过剩时段Top5',
    left: 'center', 
    textStyle: {
      color: '#fff',
      fontSize: 15,
    },
    top: '5%'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '4%', 
    right: '4%',
    top: '15%',
    bottom: '4%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01],
    axisLabel: {
      fontSize: 10 
    }
  },
  yAxis: {
    type: 'category',
    data: ['15:00-16:00','14:00-15:00','22:00-23:00', '10:00-11:00', '5:00-6:00'],
    axisLabel: {
      fontSize: 12 
    }
  },
  series: [
    {
      name: '出行人数',
      type: 'bar',
      barWidth: '30%', // 缩小柱状图的宽度
      itemStyle: {
        color: '#ee6666' 
      },
      data: [18911, 16350, 16090, 17009, 17901.4]
    },
    {
      name: '车辆可承载人数',
      type: 'bar',
      barWidth: '30%', // 缩小柱状图的宽度
       itemStyle: {
        color: '#73c0de' 
      },
      data: [19497.9,19744.0,19230.9,19034.8,20497.9]
    }
  ]
});

//公交站运力不足情况数据
const busCongestionData = {
  "2022-11-15": {
    "龙翔桥": {
      times: ['18:00-19:00','17:00-18:00','12:00-13:00', '11:00-12:00', '8:00-9:00'],
      people: [8990,7091,5979,5732.4,4650.1],
      capacity: [6890,5781,5517.2,5193.9,4177.3]
    },
    "凤起路": {
      times: ['18:00-19:00', '17:00-18:00', '13:00-14:00', '7:00-8:00', '19:00-20:00'],
      people: [7788, 6980, 5917, 5900, 4621],
      capacity: [6000, 6119, 5098, 5421, 4220]
    },
    "杭州东站": {
      times: ['18:00-19:00', '17:00-18:00', '12:00-13:00', '13:00-14:00', '7:00-8:00'],
      people: [7870, 6778, 6523, 5489, 4998],
      capacity: [6989, 6098, 5991, 5158, 4678]
    }
  },
  "2022-11-14": {
    "龙翔桥": {
      times: ['18:00-19:00','17:00-18:00','12:00-13:00', '11:00-12:00', '8:00-9:00'],
      people: [8923,7121,5923,5654.4,4611.1],
      capacity: [7097,6098,5245.2,5154.9,4121.3]
    },
    "凤起路": {
      times: ['18:00-19:00', '17:00-18:00', '13:00-14:00', '7:00-8:00', '19:00-20:00'],
      people: [7345, 6874, 5999, 5913, 4632],
      capacity: [6123, 6098, 5698, 5221, 4128]
    },
    "杭州东站": {
      times: ['18:00-19:00', '17:00-18:00', '12:00-13:00', '13:00-14:00', '7:00-8:00'],
      people: [8170, 7778, 6123, 5389, 5098],
      capacity: [7089, 6998, 6091, 5109, 4978]
    }
  },
  "2022-11-13": {
    "龙翔桥": {
      times: ['18:00-19:00','17:00-18:00','12:00-13:00', '11:00-12:00', '8:00-9:00'],
     people: [8234,6712,6091,5532.4,4750.1],
      capacity: [7098,5981,5437.2,5765.9,4543.3]
    },
    "凤起路": {
      times: ['18:00-19:00', '17:00-18:00', '13:00-14:00', '7:00-8:00', '19:00-20:00'],
      people: [7768, 6982, 5987, 5860, 4698],
      capacity: [6789, 6019, 5198, 5221, 4120]
    },
    "杭州东站": {
      times: ['18:00-19:00', '17:00-18:00', '12:00-13:00', '13:00-14:00', '7:00-8:00'],
      people: [7870, 6798, 6523, 5409, 4198],
      capacity: [7009, 6198, 5901, 5108, 4078]
    }
  },
};
// 公交运力不足时段Top5
const busCongestionOption = ref({
  title: {
    text: '龙翔桥公交站运力不足时段Top5', 
    left: 'center',
    textStyle: {
      color: '#fff',
      fontSize: 15,
    },
    top: '5%'
  },
  tooltip: {},
  grid: {
    left: '15%',   // 左边距
    right: '10%',  // 右边距
    top: '15%',    // 上边距
    bottom: '15%'  // 下边距
  },
  dataset: {
    source: [
      ['18:00-19:00',8990 ,6890 ],
      ['17:00-18:00', 7091, 5781],
      ['12:00-13:00', 5979, 5517.2],
      ['11:00-12:00', 5732.4, 5193.9],
      ['8:00-9:00', 4650.1, 4177.3] 
    ]
  },
  xAxis: { 
    type: 'category',
    axisLabel: {
      interval: 0, // 显示所有标签
      rotate: 30   // 标签旋转30度
    } },
  yAxis: {
    min: 0,
    max: 10000,
    interval: 2000
  },
  series: [
    { 
      name: '出行人数', 
      type: 'bar', 
      barWidth: '30%',
      itemStyle: {
        color: '#ee6666' 
      },
    }, // 适当缩小柱状的宽度
    { 
      name: '车辆可承载人数', 
      type: 'bar', 
      barWidth: '30%',
      itemStyle: {
        color: '#73c0de' 
      },
    }
  ]
});

//公交运力过剩情况数据
const busExcessData = {
  "2022-11-15": {
    "龙翔桥": {
      times: ['22:00-23:00','5:00-6:00','6:00-7:00', '21:00-22:00', '9:00-10:00'],
      people: [5609,4889,3917.2,3893.9,2977.3],
      capacity: [8990,7091,5979,5732.4,4650.1]
    },
    "凤起路": {
      times: ['5:00-6:00', '22:00-23:00', '6:00-7:00', '21:00-22:00', '9:00-10:00'],
      people: [6800, 6900, 5812, 5901, 5200],
      capacity: [7412, 7351, 6051, 6413, 5609]
    },
    "杭州东站": {
      times: ['5:00-6:00', '9:00-10:00', '6:00-7:00', '22:00-23:00', '21:00-22:00'],
      people: [6717, 6898, 6080, 5672, 4890],
      capacity: [7121, 7297, 6312, 5998, 5087]
    }
  },
  "2022-11-14": {
    "龙翔桥": {
      times: ['22:00-23:00','5:00-6:00','6:00-7:00', '21:00-22:00', '9:00-10:00'],
      people: [6761,5518,5271.2,5013.9,4977.3],
      capacity: [8172,6391,5987,5711.4,5650.1]
    },
    "凤起路": {
      times: ['5:00-6:00', '22:00-23:00', '6:00-7:00', '21:00-22:00', '9:00-10:00'],
      people: [6908, 6700, 5109, 4634, 3098],
      capacity: [7512, 7151, 6515, 4998, 3409]
    },
    "杭州东站": {
      times: ['5:00-6:00', '9:00-10:00', '6:00-7:00', '22:00-23:00', '21:00-22:00'],
      people: [6811, 6765, 5989, 5872, 4909],
      capacity: [7421, 7297, 6212, 6298, 5387]
    }
  },
  "2022-11-13": {
    "龙翔桥": {
      times: ['10:00-11:00','14:00-15:00','23:00-0:00', '6:00-7:00', '5:00-6:00'],
      people: [6895,5681,5117.2,4993.9,4171.3],
      capacity: [8931,6991,5900,5432.4,4658.1]
    },
    "凤起路": {
      times: ['5:00-6:00', '22:00-23:00', '6:00-7:00', '21:00-22:00', '9:00-10:00'],
      people: [6782, 5870, 5213, 5104, 4922],
      capacity: [7312, 6251, 5401, 5513, 5142]
    },
    "杭州东站": {
      times: ['5:00-6:00', '9:00-10:00', '6:00-7:00', '22:00-23:00', '21:00-22:00'],
      people: [6876, 5798, 5080, 4872, 4490],
      capacity: [7421, 7219, 5302, 5198, 4787]
    }
  },
};
// 公交运力过剩时段Top5
const busExcessOption = ref({
  title: {
    text: '龙翔桥公交站运力过剩时段Top5', 
    left: 'center',
    textStyle: {
      color: '#fff',
      fontSize: 15,
    },
    top: '5%'
  },
  tooltip: {},
  grid: {
    left: '15%',   // 左边距
    right: '10%',  // 右边距
    top: '15%',    // 上边距
    bottom: '15%'  // 下边距
  },
  dataset: {
    source: [
      ['22:00-23:00' ,5609,8990 ],
      ['5:00-6:00', 4889, 7091],
      ['6:00-7:00', 3917.2, 5979],
      ['21:00-22:00', 3893.9, 5732.4],
      ['9:00-10:00', 2977.3, 4650.1] 
    ]
  },
  xAxis: { 
    type: 'category',
    axisLabel: {
      interval: 0, // 显示所有标签
      rotate: 30   // 标签旋转30度
    } },
  yAxis: {
    min: 0,
    max: 10000,
    interval: 2000
  },
  series: [
    { 
      name: '出行人数', 
      type: 'bar', 
      barWidth: '30%',
      itemStyle: {
        color: '#ee6666' 
      },
    }, // 适当缩小柱状的宽度
    { 
      name: '车辆可承载人数', 
      type: 'bar', 
      barWidth: '30%',
      itemStyle: {
        color: '#73c0de' 
      },
    }
  ]
});

// 模拟不同日期的数据
const flowRateData = {
  "2022-11-15": {
    "龙翔桥": {
      subway: [0, 0, 0, 0, 901.4, 17091, 23804, 25092, 24092, 22631.0, 17009.4, 21437, 26987.5, 18719, 16350, 18911, 20742, 27092.0, 28901.3, 23561.1, 22599.3, 17009, 16090.1, 10009.4],
      bus: [0, 0, 0, 0, 3657.0, 4889.2, 3917.2, 3997.6, 4650.3, 2997.3, 2018.8, 5722.4, 5979, 5979.6, 2186.9, 2178.0, 2298.4, 7091, 8990, 5389.6, 5617.2, 3893.9, 5609, 0.0, 0.0]
    },
    "凤起路": {
      subway: [0, 0, 0, 0, 0, 13512, 16512, 22111, 23512, 15192.0, 19000.0, 23230.0, 13410.0, 15097.0, 24230.0, 24511.0, 24511.0, 25098.0, 26123.0, 23453.0, 21346.0, 21200.0, 16087.0, 12098.0],
      bus: [0, 0, 0, 0, 0, 6800.0, 5812.0, 5811.0, 3421.0, 5222.0, 2121.0, 5350.0, 5563.0, 5917.0, 2300.0, 2434.0, 2421.0, 6235.0, 6980.0, 7788.0, 4621.0, 3000.0, 5901.0, 6976.0, 0.0]
    },
    "杭州东站": {
      subway: [0, 0, 0, 0, 0, 5500, 15230, 17739, 25433.0, 26724.0, 22452.0, 23032.0, 20142.0, 26774.0, 25692.0, 23648.0, 24054.0, 25904.0, 27893.0, 22086.0, 19034.0, 17045.0, 13473.0, 12004.0],
      bus: [0, 0, 0, 0, 4200.0, 3800.0, 3100.0, 6700.0, 3600.0, 4100.0, 2300.0, 5900.0, 6000.0, 6300.0, 2400.0, 2500.0, 2600.0, 7200.0, 9100.0, 5300.0, 5000.0, 3200.0, 4700.0, 0.0, 0.0]
    }
  },
  "2022-11-14": {
    "龙翔桥": {
      subway: [0, 0, 0, 0, 1813.4, 16802, 24983, 24565, 25265, 21774.0, 16536.4, 22052, 26897.5, 17707, 16372, 18823, 21179, 27184.0, 27901.3, 23671.1, 22853.3, 16977, 16159.1, 10692.4],
      bus: [0, 0, 0, 0, 3889.0, 4917.2, 5290.7, 7617.6, 4410.3, 4198.7, 2098.8, 5778.4, 5879, 6079.6, 2516.9, 2328.0, 2028.4, 6991, 8975.6, 5349.6, 5017.2, 3109.9, 4609, 0.0, 0.0]
    },
    "凤起路": {
      subway: [0, 0, 0, 0, 0, 14497, 15787, 21892, 24051, 15043.0, 18933.0, 22558.0, 13525.0,  15031.0, 24211.0, 23959.0, 24893.0, 25461.0, 26159.0, 27103.0, 21432.0, 20471.0,  16123.0, 12047.0],
      bus: [0, 0, 0, 0, 4000.0, 3200.0, 2400.0, 6500.0, 3500.0, 4200.0, 2200.0, 5800.0, 5900.0, 6200.0, 2300.0, 2400.0, 2500.0, 7100.0, 9000.0, 5200.0, 5100.0, 3000.0, 4600.0, 0.0, 0.0]
    },
    "杭州东站": {
      subway: [0, 0, 0, 0, 0, 5500, 5900, 24000, 31000.0, 28500.0, 17500.0, 22500.0, 15000.0, 22000.0, 24000.0, 20000.0, 19000.0, 27000.0, 28000.0, 31000.0, 27000.0, 21000.0, 15000.0, 11000.0],
      bus: [0, 0, 0, 0, 4789.0, 4131.0, 3247.0, 6823.0, 3903.0, 4563.0, 1949.0, 5507.0, 6312.0, 6169.0, 2881.0, 2649.0, 2525.0, 7559.0, 9278.0, 5069.0, 4807.0, 2843.0, 5156.0, 0.0, 0.0]
    }
  },
  "2022-11-13": {
    "龙翔桥": {
      subway: [0, 0, 0, 0, 1659.4, 15753, 24635, 23867, 25313, 21704.0, 17003.4, 21462, 27272.5, 18745, 17394, 18813, 21115, 27761.0, 28901.3, 23619.1, 22794.3, 17031, 16122.1, 11254.4],
      bus: [0, 0, 0, 0, 3445.0, 4974.2, 3835.2, 3945.6, 4654.3, 2912.3, 2013.8, 5761.4, 6014, 5903.6, 2251.9, 2179.0, 2297.4, 7121, 9026, 5382.6, 5632.2, 3892.9, 5613, 0.0, 0.0]
    },
    "凤起路": {
      subway: [0, 0, 0, 0, 0, 14192, 16134, 22184, 22973, 14987.0, 18756.0, 23249.0, 13607.0, 14892.0, 24062.0, 24322.0, 24947.0, 24903.0, 24948.0, 25433.0, 21578.0, 20842.0, 16097.0, 11986.0]      ,
      bus: [0, 0, 0, 0, 0, 7523.0, 5233.0, 5772.0, 3662.0, 5368.0, 2118.0, 5472.0, 4647.0, 5921.0, 2328.0, 2431.0, 2398.0, 6195.0, 7015.0, 7727.0, 4448.0, 2943.0, 5913.0, 6929.0, 0.0]
    },
    "杭州东站": {
      subway: [0, 0, 0, 0, 0, 5500, 5900, 24000, 31000.0, 28500.0, 17500.0, 22500.0, 15000.0, 22000.0, 24000.0, 20000.0, 19000.0, 27000.0, 28000.0, 31000.0, 27000.0, 21000.0, 15000.0, 11000.0],
      bus: [0, 0, 0, 0, 4301.0, 3745.0, 3067.0, 6789.0, 3621.0, 4289.0, 2112.0, 5907.0, 6012.0, 6225.0, 2515.0, 2468.0, 2639.0, 7178.0, 9208.0, 5376.0, 4952.0, 3243.0, 4812.0, 0.0, 0.0]
    }
  },
}

const selectedStation = ref('龙翔桥'); //初始日期
const selectedDate = ref("2022-11-15"); //初始日期
//24小时客流量
const flow_rate = ref({
  title: {
    text: `龙翔桥地铁及公交24小时客流量`,
    textStyle: {
      color: '#fff',
      fontSize:15
    }
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['地铁', '公交'],
    textStyle: {
      color: '#fff',
      fontSize:'12px'
    }
  },
  toolbox: {
    show: true,
    feature: {
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ['line', 'bar'] },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  calculable: true,
  xAxis: [
    {
      type: 'category',
      data: [
        '0时', '1时', '2时', '3时', '4时', '5时', '6时', '7时', '8时', '9时', '10时', '11时',
        '12时', '13时', '14时', '15时', '16时', '17时', '18时', '19时', '20时', '21时', '22时', '23时'
      ],
      axisLabel: {
        color: '#fff' 
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      min: 0, // 设置y轴最小值
      max: 30000, // 设置y轴最大值
      interval: 5000, // 设置刻度间隔
      axisLabel: {
        color: '#fff' 
      }
    }
  ],
  series: [
    {
      name: '地铁',
      barWidth: 10,
      type: 'bar',
      data: [0, 0, 0, 0, 901.4, 17091, 23804, 25092, 24092, 22631.0, 17009.4, 21437, 26987.5, 18719, 16350, 18911, 20742, 27092.0, 28901.3, 23561.1, 22599.3, 17009, 16090.1, 10009.4],
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' }
        ]
      },
      markLine: {
        data: [{ type: 'average', name: 'Avg' }]
      }
    },
    {
      name: '公交',
      barWidth: 10,
      type: 'bar',
      data: [0, 0, 0, 0, 3657.0, 4889.2, 3917.2, 3997.6, 4650.3, 2997.3, 2018.8, 5722.4, 5979, 5979.6, 2186.9, 2178.0, 2298.4, 7091, 8990, 5389.6, 5617.2, 3893.9, 5609, 0.0, 0.0],
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' }
        ]
      },
      markLine: {
        data: [{ type: 'average', name: 'Avg' }]
      }   
    }
  ]
});

// 监听selectedDate的变化并更新flow_rate的title
watch([selectedStation,selectedDate], ([newStation,newDate]) => {
  //更新标题
  flow_rate.value.title.text = `${newStation}地铁及公交24小时客流量(${newDate})`;
  congestionOption.value.title.text = `${newStation}地铁站运力不足情况top5(${newDate})`;
  excessOption.value.title.text = `${newStation}地铁站运力过剩情况Top5(${newDate})`;
  busCongestionOption.value.title.text = `${newStation}公交站运力不足时段Top5(${newDate})`;
  busExcessOption.value.title.text = `${newStation}公交站运力过剩时段Top5(${newDate})`;
  //更新flow_rate的数据
  const selectedData = flowRateData[newDate]?.[newStation];
  if (selectedData) {
    flow_rate.value.series[0].data = selectedData.subway; // 更新地铁数据
    flow_rate.value.series[1].data = selectedData.bus;    // 更新公交数据
  }
  // 更新Congestion对应的运力不足数据
  const selectedCongestionData = congestionData[newDate]?.[newStation];
  if (selectedCongestionData) {
    congestionOption.value.series[0].data = selectedCongestionData.people;   // 更新出行人数数据
    congestionOption.value.series[1].data = selectedCongestionData.capacity; // 更新车辆可承载人数数据
    congestionOption.value.yAxis.data = selectedCongestionData.times;        // 更新时段数据
  }
  // 更新Excess对应的运力过剩数据
  const selectedExcessData = excessData[newDate]?.[newStation];
  if (selectedExcessData) {
    excessOption.value.series[0].data = selectedExcessData.people;   // 更新出行人数数据
    excessOption.value.series[1].data = selectedExcessData.capacity; // 更新车辆可承载人数数据
    excessOption.value.yAxis.data = selectedExcessData.times;        // 更新时段数据
  }
  // 更新BusCongestion对应的运力不足数据
  const selectedBusCongestionData = busCongestionData[newDate]?.[newStation];
  if (selectedBusCongestionData) {
     // 更新时段数据
    busCongestionOption.value.dataset.source = selectedBusCongestionData.times.map((time, index) => {
      return [time, selectedBusCongestionData.people[index], selectedBusCongestionData.capacity[index]];
    });
  }
  // 更新BusExcess对应的运力不足数据
  const selectedBusExcessData = busExcessData[newDate]?.[newStation];
  if (selectedBusExcessData) {
    // 更新时段数据
    busExcessOption.value.dataset.source = selectedBusExcessData.times.map((time, index) => {
      return [time, selectedBusExcessData.people[index], selectedBusExcessData.capacity[index]];
    });
  }

});
</script>

<template>
  <!-- 导航栏 -->
  <header>
    <HeaderBar />
  </header>
  <!-- 主栏 -->
  <div style="height: 83vh; display: flex; justify-content: center;">
    <div class="traffic-info">
      <!-- 左侧栏 -->
      <div class="left">
        <BorderBox12 :color="['#12637c', '#14dcdf']" backgroundColor="rgba(19,35,60,.6)" style=" height:50%;">
          <v-chart :option="congestionOption" />
        </BorderBox12>
        <BorderBox12 :color="['#12637c', '#14dcdf']" backgroundColor="rgba(19,35,60,.6)" style=" height:50%;">
          <v-chart :option="excessOption" />
        </BorderBox12>
      </div>
      <!-- 中间栏 -->
      <div class="middle">
        <div style="width: 100%; display: flex; flex-direction: column;">
          <div  style="display: flex; flex-direction: row;">
            <!-- 站点下拉框 -->
            <div style="display: flex; align-items: center;margin-right:20px">
              <el-select v-model="selectedStation" placeholder="请选择站点" style="width: 150px;">
                <el-option label="龙翔桥" value="龙翔桥" />
                <el-option label="凤起路" value="凤起路" />
                <el-option label="杭州东站" value="杭州东站" />
              </el-select>
            </div>
            <!-- 日期下拉框 -->
            <div style="display: flex; align-items: center;">
              <el-select v-model="selectedDate" placeholder="请选择日期" style="width: 150px;">
                <el-option label="2022-11-15" value="2022-11-15" />
                <el-option label="2022-11-14" value="2022-11-14" />
                <el-option label="2022-11-13" value="2022-11-13" />
              </el-select>
            </div>
          </div>
          <!-- 24小时客流量 -->
          <div id="flow_rate_container" style="width: 100%; height: 50%; padding-top:30px">
            <v-chart :option="flow_rate" />
          </div>
          <BorderBox12 :color="['#12637c', '#14dcdf']" style=" height: 50%;padding: 6px;">
            <div id="center-map" style="width: 100%; height:100%;border-radius:5px"></div>
          </BorderBox12>
        </div>
      </div>
      <!-- 右侧栏 -->
      <div class="right">
        <BorderBox12 :color="['#12637c', '#14dcdf']" backgroundColor="rgba(19,35,60,.6)" style=" height:50%;">
          <v-chart :option="busCongestionOption" />
        </BorderBox12>
        <BorderBox12 :color="['#12637c', '#14dcdf']" backgroundColor="rgba(19,35,60,.6)" style=" height:50%;">
          <v-chart :option="busExcessOption" />
        </BorderBox12>
      </div>
    </div>
  </div>
</template>

<style scoped>
.traffic-info {
  width: 98%;
  height: 100%;
  //background: linear-gradient(to bottom, #0e989d, #16263d);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
}

.left,
.middle,
.right {
  height: 100%;
  margin: 0 10px;
  margin-top: 30px;
}


.left,
.right {
  width: 25%;
  overflow: hidden;
}

.middle {
  width: 50%;
  display: flex;
}

.traffic-congestion {
  height: 50%;
  background: rgba(23, 73, 102, 0.8);
  border-radius: 12px;
}

.schedule-chart {
  background: rgba(23, 73, 102, 0.8);
  border-radius: 12px;
}

#driver-time-chart {
  background: rgba(23, 73, 102, 0.8);
  border-radius: 12px;
}


.section-search {
  margin: 0 5%;
  height: 100%;
}

.traffic-warning {
  height: 50%;
}
</style>
