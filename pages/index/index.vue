<template>
	<view class="container">
		<tui-no-data v-if="projects.length <=0" imgUrl="/static/images/toast/img_nodata.png">暂无数据</tui-no-data>
		<tui-swipe-action :actions="actions" @click="handlerButton" v-for="(item,index) in projects" :key="index"
			:params="item">
			<template v-slot:content>
				<view class="tui-list-item">
					<image :src="'/static/images/news/1.jpg'" class="item-img"></image>
					<view class="item-box">
						<view class="item-title">{{item.name}}</view>
						<view class="item-time">{{ item.createTime }}</view>
					</view>
				</view>
			</template>
		</tui-swipe-action>
		<tui-fab @click="clickFab"></tui-fab>
	</view>
</template>

<script>
	import storage from '@/utils/storage.js';
	export default {
		data() {
			return {
				actions: [{
						name: '删除',
						color: '#fff',
						fontsize: 30, //单位rpx
						width: 70, //单位px
						background: '#FD3B31'
					},
					{
						name: '修改',
						width: 70,
						fontsize: 30,
						color: '#fff',
						background: '#C8C7CD'
					}
				],
				projects: [],
				title: 'Hello',
				/* btnList: [{
					bgColor: "#16C2C2",
					//名称
					text: "关于",
					//字体大小
					fontSize: 28,
					//字体颜色
					color: "#fff"
				}, {
					bgColor: "#64B532",
					//名称
					text: "分享",
					//字体大小
					fontSize: 28,
					//字体颜色
					color: "#fff"
				}] */
			}
		},
		onShow() {
			this.projects = storage.getProjectsFromStorage() || [];
			console.log(this.projects);

		},
		onLoad() {

		},
		methods: {
			handlerButton(e) {
				let index = e.index;
				let item = e.item;

				if (index === 0) {
					// delete
					const index = this.projects.findIndex(i => i.name === item.name);
					this.projects.splice(index, 1);
					storage.setProjectInfoToStorage(this.projects);

				}
				let menuTxt = ["删除", "修改", "收藏"][index];
				this.tui.toast(`${menuTxt}成功`,1000,'success');
				// setTimeout(() => {
				// 	this.closable= this.closable ? false : true
				// }, 200)
			},
			clickFab(index) {
				// this.projects.push({id:11});
				uni.navigateTo({
					url: '/pages/addProject/addProject',
					success: res => {
						console.log(res);
					},
					fail: () => {},
					complete: () => {}
				});
				// console.log(index);
			}

		}
	}

</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.container {
		background: #fff;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-list-item {
		padding: 30rpx 30rpx;
		display: flex;
		align-items: item;
	}

	.item-img {
		height: 120rpx;
		width: 120rpx;
		margin-right: 20rpx;
		display: block
	}

	.item-box {
		flex: 1;
		width: 70%;
		display: flex;
		flex-direction: column;
		justify-content: space-between
	}

	.item-title {
		font-size: 32rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

	}

	.item-time {
		color: #999;
		font-size: 24rpx;
	}

</style>

