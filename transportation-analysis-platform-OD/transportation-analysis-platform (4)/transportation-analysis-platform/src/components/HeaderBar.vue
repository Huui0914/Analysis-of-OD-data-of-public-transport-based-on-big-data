<script setup>
import { onMounted, ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import ButtonComponent from './ButtonComponent.vue'

import homeBackground from '@/assets/home-header-img.svg'
import homeBackground2 from '@/assets/home-header-img2.svg'
import homeBackground3 from '@/assets/home-header-img3.svg'
import SimulationBackground from '@/assets/simulation-header-img.svg'
import heatmapBackground from '@/assets/heatmap-header-img.svg'
import avatar from '@/assets/avatar.jpg'
import aiImg from '@/assets/ai-img.jpg'

const backgroundImage = ref('')
const leftButton = reactive({ value: '', link: '' })
const rightButton = reactive({ value: '', link: '' })
const leftleftButton = reactive({ value: '', link: '' })
const rightrightButton = reactive({ value: '', link: '' })

const dialogVisible = ref(false) // 控制对话框显示
const inputContent = ref('') // 输入框内容
const conversationHistory = ref([]) // 用于存储对话的历史记录
const isTyping = ref(false) // 模拟 AI 是否在打字
let firstInteraction = true // 记录是否是首次唤醒 AI

// 模拟 AI 打字机效果的函数
const typeWriterEffect = async (text, delay = 50) => {
  let currentText = ''
  for (let i = 0; i < text.length; i++) {
    currentText += text[i]
    conversationHistory.value[conversationHistory.value.length - 1].text = currentText
    await new Promise(resolve => setTimeout(resolve, delay))
  }
}

// 设置背景图片和按钮
onMounted(() => {
  const route = useRoute()
  if (route.path === '/') {
    backgroundImage.value = `url(${homeBackground})`
    leftButton.value = '线网优化'
    leftButton.link = '/optimization'
    rightButton.value = '城市交通管理'
    rightButton.link = '/trafficmanagement'
    leftleftButton.value = 'Maas'
    leftleftButton.link = '/maas'
    rightrightButton.value = '线下商业化'
    rightrightButton.link = '/offline'
  } else if (route.path === '/trafficmanagement') {
    backgroundImage.value = `url(${SimulationBackground})`
    leftButton.value = '智能排班'
    leftButton.link = '/'
    rightButton.value = '线下商业化'
    rightButton.link = '/offline'
    leftleftButton.value = '线网优化'
    leftleftButton.link = '/optimization'
    rightrightButton.value = 'Maas'
    rightrightButton.link = '/maas'
  } else if (route.path === '/offline') {
    backgroundImage.value = `url(${homeBackground3})`
    leftButton.value = '城市交通管理'
    leftButton.link = '/trafficmanagement'
    rightButton.value = 'Maas'
    rightButton.link = '/maas'
    leftleftButton.value = '智能排班'
    leftleftButton.link = '/'
    rightrightButton.value = '线网优化'
    rightrightButton.link = '/optimization'
  } else if (route.path === '/maas') {
    backgroundImage.value = `url(${homeBackground2})`
    leftButton.value = '线下商业化'
    leftButton.link = '/offline'
    rightButton.value = '线网优化'
    rightButton.link = '/optimization'
    leftleftButton.value = '城市交通管理'
    leftleftButton.link = '/trafficmanagement'
    rightrightButton.value = '智能排班'
    rightrightButton.link = '/'
  } else if (route.path === '/optimization') {
    backgroundImage.value = `url(${heatmapBackground})`
    leftButton.value = 'Maas'
    leftButton.link = '/maas'
    rightButton.value = '智慧排班'
    rightButton.link = '/'
    leftleftButton.value = '城市交通管理'
    leftleftButton.link = '/trafficmanagement'
    rightrightButton.value = '线下商业化'
    rightrightButton.link = '/offline'
  } else {
    backgroundImage.value = `url(${homeBackground})`
  }
})

// 模拟 AI 根据用户输入进行回答
const generateAIResponse = async (input) => {
  let response = ''

  if (firstInteraction) {
    response = '你好呀，有什么我可以帮助你的。'
    firstInteraction = false
  } else {
    switch (input) {
      case '你好':
        response = '你好！今天有什么我可以帮您解决的吗？';
        break;
      case '早上好':
        response = '早上好！祝您今天有个愉快的一天！';
        break;
      case '今天的早高峰期间，哪些公交线路的客流压力最大？应该如何调度？':
        response = '今天早高峰期间，2路和7路公交线路的客流压力较大。建议在7:30到9:00之间增加发车频次来缓解压力。';
        break;
      case '能否为即将到来的西湖音乐节活动提供一个全面的交通管理方案？':
        response = '建议增设直达公交服务，并在活动现场附近的交通枢纽设置临时停车区域，提供移动信息服务。';
        break;
      case '最近哪些路口的交通拥堵最为严重？有什么改善建议？':
        response = '在湖滨路和延安路的交汇处，交通拥堵严重。建议调整信号灯周期，提高通行效率。';
        break;
      case '结合本周的客流数据，有没有针对西湖景区的提升游客体验的建议？':
        response = '建议增加景区内的步行和观光巴士服务，同时提供实时人流信息提示。';
        break;
      case '根据当前的交通数据，附近商户是否有新的营销机会？':
        response = '数据显示平海路周边晚上人流量增加，建议商户推出晚间促销活动。';
        break;
      case '如何根据当前交通流量数据来优化杭州地铁的运营效率？':
        response = '建议增加地铁1号线在高峰期的列车密度，并缩短等车时间。';
        break;
      case '从历史数据来看，未来一周哪些区域可能会出现堵车？':
        response = '未来一周的早晚高峰预计在文三路和朝晖路附近会出现拥堵。';
        break;
      case '能否为滨江区的职住通勤提供一些优化建议？':
        response = '建议提高通勤高峰期的快巴服务频率，并增设直达班车线路。';
        break;
      case '在杭州的雨季，交通系统会面临哪些挑战？有没有预防措施？':
        response = '建议加强排水系统维护，并增派交警在关键路段指挥。';
        break;
      case '系统如何帮助优化杭州某新区的公共交通资源配置？':
        response = '建议在新区增加公交线路，构建电动自行车共享网络，提高交通可达性。';
        break;
      case '对于共享单车的使用，你有什么建议？':
        response = '建议选择信誉好的共享单车品牌，并在使用后将单车停放在指定区域，保持城市的整洁。';
        break;
      case '如果我想了解明天的交通情况，你能提供吗？':
        response = '明天的交通状况预计较为通畅，但早高峰时段可能会出现轻微拥堵。建议提前规划出行时间。';
        break;
      case '怎样才能安全地使用公共交通？':
        response = '在使用公共交通时，请务必遵守乘车秩序、佩戴口罩，并保持社交距离，确保自己和他人的安全。';
        break;
      case '如果我遇到交通事故，应该怎么处理？':
        response = '遇到交通事故时，首先要确保自己和他人的安全，然后立即拨打110和120报告情况，并尽量保留事故现场证据。';
        break;
      case '如何查看实时公交到站信息？':
        response = '您可以通过我们的手机应用，输入线路号查看实时到站信息，或者在公交站牌查阅电子显示屏。';
        break;
      case '能告诉我哪些地方有方便的停车场吗？':
        response = '杭州市内多个商圈如解放路、武林路周边都有大型购物中心提供停车服务，建议使用导航查询附近停车场信息。';
        break;
      case '如果我想参与交通管理方面的志愿活动，是否有可能？':
        response = '我们欢迎志愿者参与交通管理活动，您可以通过我们的官方网站联系志愿服务部门获取更多信息。';
        break;
      case '智能交通系统的功能包括哪些？':
        response = '智能交通系统包括实时交通监控、数据分析、信号控制、公共交通调度和交通警报等多种功能。';
        break;
      case '如何联系你们的客户服务？':
        response = '您可以通过导航栏中的“联系我们”页面，找到我们的客户服务联系方式，我们很乐意帮助您！';
        break;
      case '晚上好':
        response = '晚上好！希望您度过了愉快的一天！';
        break;
      case '谢谢':
        response = '不客气！很高兴可以帮助您。';
        break;
      case '再见':
        response = '再见！希望很快再见到您！';
        break;
      case '怎么称呼你':
        response = '我是您的智能助手，您可以叫我小助手。';
        break;
      case '你会什么':
        response = '我可以帮助回答问题、提供建议和进行简单的计算。';
        break;
      case '如何优化车辆调度以减少空车率？':
        response = '建议使用实时数据分析，动态调整发车频率，合理规划车辆运行路线。';
        break;
      case '我们如何评估客户满意度？':
        response = '可以通过定期发放问卷、收集反馈和监测社交媒体评论等方式评估客户满意度。';
        break;
      case '如何通过数据分析预测需求变化？':
        response = '利用历史数据和趋势分析，结合外部因素（如节假日、活动等）来预测未来的需求变化。';
        break;
      case '我们是否可以开展联合营销活动？':
        response = '可以与周边商户或旅游景点合作，推出联票、优惠活动等共同吸引客户。';
        break;
      case '能否提供每个线路的月度客流报告？':
        response = '根据我们的数据分析平台，定期生成各条线路的客流报告，并提供优化建议。';
        break;
      case '如何提高高峰期的接驳效率？':
        response = '建议增加高峰时段的班次，并设置临时接驳线路，方便乘客快速转换出行方式。';
        break;
      case '针对季节性旅游高峰期有什么策略？':
        response = '建议在旅游高峰前期增加宣传推广，并提前准备运力，以满足增加的出行需求。';
        break;
      case '我们如何加强与政府部门的沟通？':
        response = '定期召开协调会议，分享运营数据，保障信息透明，增强合作效果。';
        break;
      case '如何利用智能交通系统监控交通流量？':
        response = '通过智能交通系统实现实时监控，分析交通流量数据，以制定相应的交通管理方案。';
        break;
      case '数据分析系统如何帮助我们发现运营瓶颈？':
        response = '数据分析能够揭示客流分布、拥堵发生点等，通过这些信息识别出运营中的瓶颈。';
        break;
      case '是否有关于乘客行为的研究报告可以参考？':
        response = '可以通过我们的数据库访问关于乘客流动、行为和出行习惯的相关研究报告。';
        break;
      case '如何进行有效的紧急应对和处理？':
        response = '建议制定应急预案，并组织定期演练，加强员工培训，以提高应对突发事件的能力。';
        break;
      case '我们的司机培训计划有哪些内容？':
        response = '司机培训计划包括安全驾驶、服务礼仪、应急处理及交通法规等内容。';
        break;
      case '如何识别和分析潜在的客户群体？':
        response = '可以结合市场调研、数据分析和用户反馈，确定目标客户群体并进行深度分析。';
        break;
      case '如何利用社会媒体提升品牌形象？':
        response = '通过发布有价值的内容、互动活动和用户分享，增加品牌曝光和客户忠诚度。';
        break;
      case '能否提供一个科学的绩效考核体系？':
        response = '建议结合定量和定性指标，如服务质量、运行效率和客户满意度，构建全面的绩效考核体系。';
        break;
      case '如何有效地管理和维护公交车队？':
        response = '通过建立新的管理信息系统，定期开展车辆检查，确保车辆的正常运行和维护。';
        break;
      case '能否提供关于智能公交站点管理的建议？':
        response = '建议安装智能终端，提供实时信息和电子支付功能，同时提高站点的设施和服务。';
        break;
      case '如何提高上车和下车的乘客流动效率？':
        response = '建议优化站点设计，增设入口和出口，并引入人流导向标识。';
        break;
      case '我们如何利用数据分析进行市场需求预测？':
        response = '通过收集历史运营数据、节假日和特殊活动信息，应用数据模型进行需求预测。';
        break;
      case '在提升安全性方面有什么改进建议？':
        response = '建议增加监控设备，安排专人巡逻，并定期对司机和乘客进行安全教育。';
        break;
      case '如何对公交路线进行科学评估和优化？':
        response = '可利用乘客出行数据、路网特性和服务评价等进行多维度分析，提出优化建议。';
        break;
      case '在实施新政策时如何减少对乘客的不利影响？':
        response = '提前发布通知、咨询乘客意见，并开展实地调研，确保政策执行平稳过渡。';
        break;
      case '如何提高新技术在公交系统中的应用？':
        response = '建议通过试点项目推行新技术，评估效果后再进行大范围推广。';
        break;
      case '可否定期对我们的运营数据进行基准分析？':
        response = '我们可以提供同行业的运营数据，帮助您进行性能基准分析。';
        break;
      case '如何加强司机与后台调度中心的沟通？':
        response = '建议使用即时通讯工具，设置定期会议及实时反馈机制，提升沟通效率。';
        break;
      case '能否提供有关拥堵管理的最佳实践案例？':
        response = '可以分享国内外成功的拥堵管理案例，帮助您借鉴和实施有效的管理策略。';
        break;
      case '如何有效推动公交车辆电动化？':
        response = '建议通过政策支持、资金补贴、配套设施建设等方式，加快车辆电动化进程。';
        break;
      case '如何与其他交通工具进行有效衔接？':
        response = '通过设立换乘站、提供实时信息，确保乘客流畅转乘不同交通方式。';
        break;
      case '如何能让我们的服务更具竞争力？':
        response = '加强市场调研，了解客户需求，灵活调整服务内容，提升客户体验与满意度。';
        break;
      case '提高智能票务系统的可靠性和便捷性有哪些策略？':
        response = '定期进行系统维护，优化用户界面，并增加支付方式，提升用户体验。';
        break;
      case '如何合理控制运营成本？':
        response = '通过数据分析了解成本构成，优化资源配置，减少不必要开支。';
        break;
      case '针对节假日的流量，如何提前准备？':
        response = '分析历史数据，预测客流高峰，提前安排增班和调度，确保运力充足。';
        break;
      case '如何分析乘客的满意反馈？':
        response = '定期收集乘客反馈数据，进行分类统计和分析，提出相应改进方案。';
        break;
      case '是否可以建立一个实时监控平台？':
        response = '建议实施实时监控平台，集成各类数据源，提高交通管理的实时性与科学性。';
        break;

      default:
        response = '很抱歉，我不太明白您的意思。能否请您换一种说法？';
        break;
    }

  }

  // 在对话中显示 AI 回答，并模拟打字效果
  const aiResponse = {
    sender: 'ai',
    text: ''
  }
  conversationHistory.value.push(aiResponse)
  isTyping.value = true
  await typeWriterEffect(response)
  isTyping.value = false
}

// 当用户提交问题时，记录对话历史
const handleUserInput = async () => {
  if (inputContent.value.trim() !== '') {
    const userMessage = {
      sender: 'user',
      text: inputContent.value
    }
    conversationHistory.value.push(userMessage)
    await generateAIResponse(inputContent.value)
    inputContent.value = ''
  }
}

const openDialog = () => {
  dialogVisible.value = true
  if (firstInteraction) {
    generateAIResponse('')
  }
}
</script>



<template>

  <div>

    <div class="header-bar">

      <div class="weather">

        <LocationFilled style="height: 30px; color: #3594db; margin-right: 4px" />

        <span style="font-weight: bold; margin-right: 20px; white-space: nowrap">杭州市</span>

        <PartlyCloudy style="height: 30px; margin-right: 4px" />

        <span style="margin-right: 10px; white-space: nowrap">多云</span>

        <span>6℃~17℃</span>

      </div>
      <div class="title">

        <ButtonComponent position="leftleft-button" :text="leftleftButton.value" :link="leftleftButton.link"
          style="height: 40%" />

        <ButtonComponent position="left-button" :text="leftButton.value" :link="leftButton.link" style="height: 40%" />

        <div class="main-title" :style="{ background: backgroundImage }">

          <span class="main-title-text">公共交通OD分析服务</span>

        </div>

        <ButtonComponent position="right-button" :text="rightButton.value" :link="rightButton.link"
          style="height: 40%; margin: 4px" />

        <ButtonComponent position="rightright-button" :text="rightrightButton.value" :link="rightrightButton.link"
          style="height: 40%" />

      </div>

      <div class="account-info">

        <div class="AI-info" @click="openDialog">

          <el-avatar :size="50" style="margin: 8px; margin-top: 40px" :src="aiImg" />

        </div>

        <span>AI助手</span>

        <a class="exit">退出</a>

      </div>

    </div>



    <!-- Dialog 弹出框 -->

    <el-dialog v-model="dialogVisible" width="40%"
      style="background: linear-gradient(to bottom, #0e989d, #16263d); border-radius: 8px">

      <template #header="{ titleId, titleClass }">

        <div class="my-header">

          <h4 :id="titleId" :class="titleClass" style="color: white">AI 助手</h4>

        </div>

      </template>

      <div class="conversation-history" style="max-height: 500px"> <!-- 增加对话框内容区域的最大高度 -->

        <div v-for="(message, index) in conversationHistory" :key="index" class="message">

          <div :class="[message.sender === 'user' ? 'user-message' : 'ai-message']">

            {{ message.text }}

          </div>

        </div>

      </div>

      <div style="

          display: flex;

          justify-content: center;

          align-items: center;

          margin-top: 16px;

          gap: 8px;

        ">

        <el-input v-model="inputContent" placeholder="在这里输入..." @keyup.enter="handleUserInput"></el-input>

        <el-button type="primary" @click="handleUserInput">发送</el-button>

      </div>

    </el-dialog>



  </div>

</template>



<style scoped>
.header-bar {

  display: flex;

  /* 水平居中 */

  justify-content: center;

  align-items: bottom;

  height: 15vh;

  color: #fff;

}



.title {

  width: 60%;

  height: 100%;

  /* background-image: url('/images/header.png'); */

  background-size: 80% 80%;

  background-position: center;

  display: flex;

  align-items: center;

  justify-content: center;

}



.main-title {

  background-size: contain !important;

  background-position: center top !important;

  background-repeat: no-repeat !important;

  height: 100%;

  display: flex;

  align-items: center;

}



.main-title-text {

  white-space: nowrap;

  font-size: 30px;

  font-weight: 600;

  margin-bottom: 10%;

  /* 文字不显示 */

  color: transparent;

}



.weather,

.account-info {

  /* 垂直居中 */

  display: flex;

  align-items: center;

  width: 20%;

  position: relative;

  margin-right: 1%;

}

.AI-info {
  margin-top: -25px;
  /* 调整为一个更小的值来上移 */
  margin-right: 5px;
}

.weather {

  /* justify-content: flex-start; */

  margin-left: 1%;

}



.exit {

  position: absolute;

  right: 0;

}



.ai-message {

  color: black;

  padding: 8px;

  background-color: rgb(196, 220, 220);

  border-radius: 8px;

  width: fit-content;

  max-width: 90%;

  margin-top: 16px;

}



.user-message {

  color: white;

  padding: 8px;

  background-color: #133c55;

  border-radius: 8px;

  margin-left: auto;

  width: fit-content;

  max-width: 90%;

  margin-top: 16px;

}



.conversation-history {

  max-height: 400px;

  overflow: scroll;

}

/* 自定义垂直滚动条样式 */

.conversation-history::-webkit-scrollbar {

  width: 8px;
  /* 垂直滚动条宽度 */

  height: 0px;
  /* 水平滚动条高度 */

}



.conversation-history::-webkit-scrollbar-thumb {

  background-color: #3594db;
  /* 滚动条滑块的颜色 */

  border-radius: 4px;
  /* 滚动条滑块的圆角 */

}



.conversation-history::-webkit-scrollbar-thumb:hover {

  background-color: #1a6fb7;
  /* 滑块悬停时的颜色 */

}



.conversation-history::-webkit-scrollbar-track {

  background-color: #e0f7fa;
  /* 滚动条轨道的颜色 */

  border-radius: 4px;
  /* 滚动条轨道的圆角 */

}



/* 自定义水平滚动条样式 */

.conversation-history::-webkit-scrollbar-horizontal {

  height: 8px;
  /* 水平滚动条高度 */

}



.conversation-history::-webkit-scrollbar-thumb-horizontal {

  background-color: #3594db;
  /* 水平滚动条滑块的颜色 */

  border-radius: 4px;
  /* 水平滚动条滑块的圆角 */

}



.conversation-history::-webkit-scrollbar-thumb-horizontal:hover {

  background-color: #1a6fb7;
  /* 水平滑块悬停时的颜色 */

}



.conversation-history::-webkit-scrollbar-track-horizontal {

  background-color: #e0f7fa;
  /* 水平滚动条轨道的颜色 */

  border-radius: 4px;
  /* 水平滚动条轨道的圆角 */

}
</style>
