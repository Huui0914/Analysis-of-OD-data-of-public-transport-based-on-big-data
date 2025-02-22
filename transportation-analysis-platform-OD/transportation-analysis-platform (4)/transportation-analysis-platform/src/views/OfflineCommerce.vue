<template>
  <header>
    <HeaderBar />
  </header>
  <div id="Intro_Offline-Commerce" style="border-radius: 8px; display: flex;">
    <!-- 左侧容器，宽度占 40% -->
    <div id="left-container" style="width: 40%;height: 100%; padding: 5px;">
      <!-- 营销策略 -->
      <BorderBox1 class="custom-container" :color="['#12637c', '#14dcdf']" backgroundColor="rgba(19,35,60,.7)">
        <Decoration11 class="title-decor11" style="width: 250px; height: 60px; margin-top: 14px;">营销策略</Decoration11>
        <!-- 使用 el-scrollbar 实现下拉浏览 -->
        <el-scrollbar style="height: 750px; margin-top: 20px;">
          <div class="marketing-items">
            <div class="item-info">
              <img src="@/assets/CommerceImg1.jpg" alt="方案相关图片">
              <div class="text">
                <h3>高峰时段和热门站点</h3>
                <p>在早晚高峰时段客流量大的通勤站点附近设立快餐店和便利店，满足上班族快速用餐和购买的需求；在旅游景点等的高客流量站点周边，更适合开设咖啡馆、小吃店等，为游客提供休息和购物的便利。</p>
              </div>
            </div>
            <div class="item-info">
              <div class="text">
                <h3>客流动线研究</h3>
                <p>研究乘客从入站到出站的主要路线，并据此优化广告牌、销售点和商业设施的位置，是提升乘客体验、增加商业收益的有效策略。确保商业元素在不影响乘客流动的前提下，实现最大化可见度和转化率。</p>
              </div>
              <img src="@/assets/CommerceImg2.jpg" alt="方案相关图片">
            </div>
            <div class="item-info">
              <img src="@/assets/CommerceImg3.jpg" alt="方案相关图片">
              <div class="text">
                <h3>场景化服务</h3>
                <p>通过精准识别不同出行时段乘客的需求，可以定制化地提供早餐、咖啡、简餐、休闲服务等，从而满足乘客的即时需求，提升他们的出行体验。</p>
              </div>
            </div>
            <div class="item-info">
              <div class="text">
                <h3>本地化特色</h3>
                <p>在旅游景点、文化区等周边站点引入具有地方特色的商业服务，是一种既能吸引游客又能满足本地乘客需求的双赢策略。这种策略不仅能够丰富乘客的出行体验，还能促进地方文化的传播和经济的发展。</p>
              </div>
              <img src="@/assets/CommerceImg4.jpg" alt="方案相关图片">
            </div>
            <div class="item-info">
              <img src="@/assets/CommerceImg5.jpg" alt="方案相关图片">
              <div class="text">
                <h3>主题活动</h3>
                <p>根据节假日和特殊时段策划主题活动，是提升公共交通站点及线路吸引力、增加客流量并丰富乘客出行体验的有效手段。通过精心设计的活动，不仅可以吸引游客和本地居民的参与，还能增强社区凝聚力，促进文化传承与创新。</p>
              </div>
            </div>
            <div class="item-info">
              <div class="text">
                <h3>信息推送</h3>
                <p>利用出行APP或站内显示屏提供个性化信息推送，是提升用户体验和商家收益的创新方式。这种方式结合了智能交通系统的实时数据与用户行为分析，能够为乘客提供精准、有价值的信息，同时也为商家带来了更多的曝光和销售机会。</p>
              </div>
              <img src="@/assets/CommerceImg6.jpg" alt="方案相关图片">
            </div>
          </div>
        </el-scrollbar>
      </BorderBox1>
    </div>
    <!-- 右侧容器，宽度占 60%，按列排列 -->
    <div id="right-container" style="width: 60%; display: flex; flex-direction: column; padding: 5px;">
      <!-- 杭州公共交通信息概览 -->
      <BorderBox1 class="grid-item" :color="['#12637c', '#14dcdf']" backgroundColor="rgba(19,35,60,.7)">
        <Decoration11 class="title-decor11" style="width: 300px; height: 60px; margin-top: 14px;">杭州公共交通信息概览</Decoration11>
        <div class="right">
          <!-- 统计数据模块 -->
          <div class="stats-container">
            <div id="container1">
              <div class="stat-item">
                <img src="@/assets/subway-logo.png" alt="线路图标" />
                <div class="stat-text">
                  <p>15 条</p>
                  <span>地铁运营线路</span>
                </div>
              </div>
              <div class="stat-item">
                <img src="@/assets/Building_Img.png" alt="在建线路图标" />
                <div class="stat-text">
                  <p>17 条</p>
                  <span>地铁规划线路</span>
                </div>
              </div>
              <div class="stat-item">
                <img src="@/assets/Minister_Img.png" alt="地铁总里程图标" />
                <div class="stat-text">
                  <p>616 KM</p>
                  <span>总运营里程 (km)</span>
                </div>
              </div>
            </div>
            <div id="container2">
              <div class="stat-item">
                <img src="@/assets/Bus_Img.png" alt="公交运营线路" />
                <div class="stat-text">
                  <p>883 条</p>
                  <span>公交运营线路</span>
                </div>
              </div>
              <div class="stat-item">
                <img src="@/assets/Passenger_Flow_Img.png" alt="计划添加公交线路" />
                <div class="stat-text">
                  <p>4 条</p>
                  <span>计划添加公交线路</span>
                </div>
              </div>
              <div class="stat-item">
                <img src="@/assets/Sum_Img.png" alt="总运营里程 (km)" />
                <div class="stat-text">
                  <p>7364 KM</p>
                  <span>总运营里程 (km)</span>
                </div>
              </div>
            </div>
            <div ref="chartRef" class="dashBoard">
              <v-chart :option="compareOption" />
            </div>
          </div>
        </div>
      </BorderBox1>
      <!-- 招商引资 -->
      <BorderBox1 class="grid-item" :color="['#12637c', '#14dcdf']" backgroundColor="rgba(19,35,60,.7)" style="overflow: hidden; margin-top: 20px;">
        <Decoration11 class="title-decor11" style="width: 300px; height: 60px; margin-top: 14px;">招商引资</Decoration11>
        <div class="commerce">
          <!-- 饼状图 -->
          <div ref="chartRef" class="commerce-pie-chart">
            <v-chart :option="commerceOption" />
          </div>
          <!-- 招商APP -->
          <div class="commerce-container">
            <div id="container3">
              <div class="commerce-item">
                <img src="@/assets/alibaba.png" alt="阿里巴巴" />
                <div class="commerce-text">
                  <span>阿里巴巴</span>
                </div>
              </div>
              <div class="commerce-item">
                <img src="@/assets/baidu.png" alt="百度" />
                <div class="commerce-text">
                  <span>百度</span>
                </div>
              </div>
              <div class="commerce-item">
                <img src="@/assets/dingding.png" alt="钉钉" />
                <div class="commerce-text">
                  <span>钉钉</span>
                </div>
              </div>
              <div class="commerce-item">
                <img src="@/assets/elema.png" alt="饿了么" />
                <div class="commerce-text">
                  <span>饿了么</span>
                </div>
              </div>
            </div>
            <div id="container4">
              <div class="commerce-item">
                <img src="@/assets/zhuanzhuan.png" alt="转转" />
                <div class="commerce-text">
                  <span>转转</span>
                </div>
              </div>
              <div class="commerce-item">
                <img src="@/assets/huawei.png" alt="华为" />
                <div class="commerce-text">
                  <span>华为</span>
                </div>
              </div>
              <div class="commerce-item">
                <img src="@/assets/vivo.png" alt="Vivo" />
                <div class="commerce-text">
                  <span>Vivo</span>
                </div>
              </div>
              <div class="commerce-item">
                <img src="@/assets/tianmao.png" alt="天猫" />
                <div class="commerce-text">
                  <span>Vivo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BorderBox1>
    </div>
  </div>
</template>

<script setup>
import { BorderBox1, Decoration11 } from '@kjgl77/datav-vue3'
import HeaderBar from '../components/HeaderBar.vue'
import { ref } from 'vue'
import commerceImg1 from '@/assets/CommerceImg1.jpg';

//未来展望雷达图
const compareOption = ref({
  legend: {
    left: '0',
    textStyle: {
      color: 'fffff',
      fontSize:12
    },
    data: ['公交', '地铁']
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: '服务覆盖率', max: 100 },
      { name: '运营效率', max: 100 },
      { name: '客流量管理', max: 100 },
      { name: '安全性', max: 100 },
      { name: '票价与服务质量', max: 100 },
      { name: '创新技术', max: 100 }
    ]
  },
  series: [
    {
      name: '公交 vs 地铁',
      type: 'radar',
      data: [
        {
          value: [85, 70, 90, 80, 75, 60], // 假设的公交数据
          name: '公交'
        },
        {
          value: [95, 85, 85, 95, 80, 85], // 假设的地铁数据
          name: '地铁'
        }
      ]
    }
  ]
});

//招商引资
const commerceOption = ref({
  title: {
    text: '预计引资（万元）',
    left: 'center',
    top: 0,
    textStyle: {
      color: '#ccc'
    }
  },
  tooltip: {
    trigger: 'item'
  },
  visualMap: {
    show: false,
    min: 80,
    max: 600,
    inRange: {
      colorLightness: [0, 1]
    }
  },
  series: [
    {
      type: 'pie',
      radius: '60%',
      center: ['50%', '50%'],
      data: [
        { value: 335, name: '交通建设集团' },
        { value: 310, name: '公共交通运营公司' },
        { value: 274, name: '交通工具制造商' },
        { value: 235, name: '智能交通公司' },
        { value: 400, name: '交通规划设计研究院' }
      ].sort(function (a, b) {
        return a.value - b.value;
      }),
      roseType: 'radius',
      label: {
        color: 'rgba(255, 255, 255, 0.3)'
      },
      labelLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        },
        smooth: 0.2,
        length: 10,
        length2: 20
      },
      itemStyle: {
        color: '#c23531',
        shadowBlur: 200,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      },
      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelay: function (idx) {
        return Math.random() * 200;
      }
    }
  ]
});
</script>

<style scoped>
.right{
  display: flex;
  align-items: center;
  flex-direction: row;
}
.stats-container{
  display: flex;
  flex-direction: row;
  padding: 30px;
}

#container1,#container2{
  display: flex;
  flex-direction: column;
  margin-left: 40px;
}

.stat-item{
  display: flex;
  flex-direction: row;
  color: #ffffff;
  margin-bottom: 15px;
}
.stat-item img {
  width: 65px;
  height: 65px;
  margin-right: 15px;
}
.stat-text{
  display: flex;
  flex-direction: column;
}
.stat-text p {
  font-weight: bold; /* 加粗 */
  font-size: 20px;
  text-align: left;
}

.stat-text span {
  font-size: 15px;
  text-decoration: underline; /* 下划线 */
}

.dashBoard{
  width: 40%;
  height: 300px;
  position: absolute;
  right: 0;
  margin-left: 10px;
}

.commerce{
  display: flex;
  flex-direction: row;
}
.commerce-container{
  display: flex;
  flex-direction: column;
  padding: 40px;
}

#container3,#container4{
  display: flex;
  margin-right: 40px;
}

.commerce-item{
  display: flex;
  flex-direction: column;
  color: #ffffff;
  margin-bottom: 15px;
}

.commerce-item img{
  width: 100px;
  height: 100px;
  margin-right: 15px;
}

.commerce-text span {
  font-size: 15px;
  text-decoration: underline; 
}
.commerce-pie-chart{
  width: 100%;
  height: 300px;
  margin-top: 20px;
  margin-left: 50px;
}

.marketing-items {
  display: flex;
  flex-direction: column; 
  margin: 20px;
}

.item-info {
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
  background-color: rgba(71, 71, 79, 0.2); /* 深蓝色透明背景，透明度为0.2 */
  border-radius: 20px; /* 设置圆角 */
  padding: 20px;
}

.item-info img {
  border-radius: 10%;
  width: 300px;
  height: 200px;
  margin-right: 20px;
}

.text{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.text h3{
  text-decoration: underline; 
  margin-bottom: 5px;
}
.text p {
  font-size: 12px;
  color: #fff;
  text-indent: 20px; /* 设置首行缩进 */
  text-align: left;
}

</style>
