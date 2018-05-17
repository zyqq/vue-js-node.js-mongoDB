<template>
	<div>
		<nav-header></nav-header>
		<nav-bread>
			<span>Goods</span>
		</nav-bread>
		<div class="accessory-result-page accessory-page">
			<div class="container">
				<div class="filter-nav">
					<span class="sortby">Sort by:</span>
					<a href="javascript:void(0)" class="default cur">Default</a>
					<a @click="sortGoods" href="javascript:void(0)" class="price">
						Price
						<svg class="icon icon-arrow-short" :class="{'sort-up': !sortFlag}">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-arrow-short"></use>
						</svg>
					</a>
					<a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
				</div>
				<div class="accessory-result">
					<!-- filter -->
					<div class="filter stopPop" id="filter" :class="{'filterby-show': filterBy}">
						<dl class="filter-price">
							<dt>Price:</dt>
							<dd>
								<a href="javascript:void(0)" @click="setPriceFilter('all')" :class="{'cur': priceChecked=='all'}">All</a>
							</dd>
							<dd v-for="(price, index) in priceFilter" :key="index">
								<a href="javascript:void(0)" @click='setPriceFilter(index)' :class="{'cur': priceChecked==index}">{{price.startPrice}} - {{price.endPrice}}</a>
							</dd>
						</dl>
					</div>

					<!-- search result accessories list -->
					<div class="accessory-list-wrap">
						<div class="accessory-list col-4">
							<ul>
								<li v-for="(item, index) in goodsList" :key="index">
									<div class="pic">
										<!--v-lazy="'static/1.jpg'"-->
										<a href="#"><img v-lazy="'static/'+ item.productImg" alt=""></a>
									</div>
									<div class="main">
										<div class="name">{{item.productName}}</div>
										<div class="price">{{item.productPrice}}</div>
										<div class="btn-area">
											<a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
										</div>
									</div>
								</li>
							</ul>
							<div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
								<img src="../../static/loading-svg/loading-spinning-bubbles.svg" v-show="loading" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<modal :mdShow='mdShow' @close="closeModal">
			<p slot="message">
				请先登录，否则无法加入到购物车中
			</p>
			<div slot="btnGroup">
				<a class="btn btn--m" href="javascript:;" @click="closeModal">关闭</a>
			</div>
		</modal>
		<modal :mdShow='mdShowCart' @close="closeModal">
			<p slot="message">
				<svg class="icon-status-ok">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#iicon-status-ok"></use>
        </svg>
        <span>加入购物车成功！</span>
			</p>
			<div slot="btnGroup">
				<a class="btn btn--m" href="javascript:;" @click="closeModal">继续购物</a>
				<router-link class="btn btn--m" href="javascript:;" to="/cart">查看购物车</router-link>
			</div>
		</modal>
		<nav-footer></nav-footer>
	</div>
</template>

<script>
import "./../assets/css/base.css";
import "./../assets/css/login.css";
import "./../assets/css/product.css";
import NavHeader from "./../components/NavHeader";
import NavFooter from "./../components/NavFooter";
import NavBread from "./../components/NavBread";
import Modal from "./../components/Modal";
import axios from "axios";
export default {
  name: "",
  data() {
    return {
      priceFilter: [
        {
          startPrice: "0.00",
          endPrice: "100.00"
        },
        {
          startPrice: "100.00",
          endPrice: "500.00"
        },
        {
          startPrice: "500.00",
          endPrice: "1000.00"
        },
        {
          startPrice: "1000.00",
          endPrice: "5000.00"
        }
      ],
      priceChecked: "all",
      filterBy: false,
      overlayFlag: false,
      goodsList: [],
      sortFlag: true,
      mdShow: false,
      mdShowCart: false,
      page: 1,
      pageSize: 8,
      busy: true,
      loading: false
    };
  },
  methods: {
    showFilterPop() {
      this.filterBy = true;
      this.overlayFlag = true;
    },
    closePop() {
      this.filterBy = false;
      this.overlayFlag = false;
    },
    getGoodsList(flag) {
      let param = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortFlag ? 1 : -1,
        priceLevel: this.priceChecked
      };
      this.loading = true;
      axios
        .get("/goods/list", {
          params: param
        })
        .then(response => {
          this.loading = false;
          let res = response.data;
          if (res.status == "0") {
            if (flag) {
              this.goodsList = this.goodsList.concat(res.result.list);

              if (res.result.count < this.pageSize) {
                this.busy = true;
              } else {
                this.busy = false;
              }
            } else {
              this.goodsList = res.result.list;
              this.busy = false;
            }
          } else {
            this.goodsList = [];
          }
          console.log(res);
        });
    },
    setPriceFilter(index) {
      this.priceChecked = index;
      this.closePop();
      this.page = 1;
      this.getGoodsList();
    },
    sortGoods() {
      this.sortFlag = !this.sortFlag;
      this.page = 1;
      this.getGoodsList();
    },
    loadMore() {
      this.busy = true;
      setTimeout(() => {
        this.page++;
        this.getGoodsList(true);
      }, 500);
    },
    addCart(productId) {
      axios.post("/goods/addCart", { productId: productId }).then(res => {
        if (res.data.status == "0") {
          this.$store.commit("updateCartCount", 1);
          this.mdShowCart = true;
        } else {
          this.mdShow = true;
        }
      });
    },
    closeModal() {
      this.mdShow = false;
      this.mdShowCart = false;
    }
  },
  components: {
    NavHeader,
    NavFooter,
    NavBread,
    Modal
  },
  mounted() {
    this.getGoodsList();
  }
};
</script>

<style scoped>
.load-more {
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.sort-up {
  transform: rotate(180deg);
  transition: all 0.3s ease-out;
}
</style>