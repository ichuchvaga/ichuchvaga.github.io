<template>
	<div class="popover search-popover" v-show="isActive">
		<div class="popover-heading">
			<div class="h3">Выбор города</div>
			<a href="#" class="popover-close" @click.prevent="closeHandler">
				<span class="icon icon-modal-close"></span>
			</a>
		</div>

		<div class="popover-content">

			<form class="search-form">
				<div class="search-bar">
					<input type="text" class="search-bar__input" name="q" placeholder="Поиск города" v-model="searchValue">
					<button type="submit" class="search-bar__btn" value=""></button>
				</div>
			</form>

			<div class="search-popover__cities">
				<div v-if="filteredCities.length" class="cities-wrapper">
					<div class="cities-column">
						<ul>
							<li v-for="(city, index) in citiesSplittedInto3Columns.a" :key="'city-col1-'+index">
								<a href="#">{{ city.title }}</a>
							</li>							
						</ul>
						
					</div>
					<div class="cities-column">
						<ul>
							<li v-for="(city, index) in citiesSplittedInto3Columns.b" :key="'city-col2-'+index">
								<a href="#">{{ city.title }}</a>
							</li>							
						</ul>
					</div>
					<div class="cities-column">
						<ul>
							<li v-for="(city, index) in citiesSplittedInto3Columns.c" :key="'city-col3-'+index">
								<a href="#">{{ city.title }}</a>
							</li>							
						</ul>
					</div>
				</div>
				<div class="search-popover__not-found" v-else>По данному запросу города не найдены.</div>
			</div>
		</div>

	</div>
</template>

<script>
import cities from './cities.json';

export default {
	data() {
		return {
			cities,
			searchValue: ''
		}
	},
	props: {
		isActive: {
			type: Boolean,
			default: false
		},
		closeHandler: {
			type: Function
		}
	},
	computed: {
		filteredCities() {
			if (this.searchValue == '') {
				return cities;
			}

			return cities.filter((value, idx) => {
				var rgx = new RegExp(this.searchValue, 'i');
				var result = rgx.test(value.title);

				return result;
			});
		},
		citiesSplittedInto3Columns: function() {
			let resultCities = {
				a: [],
				b: [],
				c: []
			};

			let resultCityIndex = 1;
			this.filteredCities.map((x) => {
				if (resultCityIndex === 1) {
					resultCities.a.push(x);
				}
				if (resultCityIndex === 2) {
					resultCities.b.push(x);
				}
				if (resultCityIndex === 3) {
					resultCities.c.push(x);
				}

				if (resultCityIndex === 3) {
					resultCityIndex = 1;
				} else {
					resultCityIndex++;
				}
				
				return x;
			});

			return resultCities;
		}
	}
}
</script>
<style src="./CityPopover.sass"></style>