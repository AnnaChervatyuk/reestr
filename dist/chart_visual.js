$(() => {

function getRandomInt() {
  return Math.floor(Math.random() * 200000);
}

const chartTypes = ['stackedBar', 'fullStackedBar']
var choosedType = 0;

const listColors = ['#4661BC']

$.getJSON( "./data.json", function( json ) {
    let dataJSON = json;
    dataJSON.forEach((item, i) => {
      item.startPeriodDate = item.startPeriodDate.split("-").reverse().join("-")
      item.endPeriodDate = item.endPeriodDate.split("-").reverse().join("-")
    });

    function getFullListDepartaments() {
      let arr = []
      let list = []

      dataJSON.forEach((item, i) => {
        list = [...new Set([...arr, ...Object.keys(item.departmentsData)])];
        arr = [...new Set([...arr, ...list])]
      });
      return list;
    }

    let listDepartaments = [];

    function getDistributionChartData (dataSource) {
      listDepartaments = getFullListDepartaments().map((node)=>{
        return {departament: node, blocked: 0, unblocked: 0, blockedTrain: 0}
      })

      dataSource.forEach((node, j) => {
        let dep = node.departmentsData
        listDepartaments.forEach((item, i) => {
          if (dep[item.departament]) {
            item.blocked += dep[item.departament].blocked || 0
            item.unblocked += dep[item.departament].unblocked || 0
            item.blockedTrain += dep[item.departament].blockedTrain || 0
          }
        });
      })
      listDepartaments = listDepartaments.sort((a, b) => (a.blocked + a.unblocked + a.blockedTrain) - (b.blocked + b.unblocked + b.blockedTrain))
    }

    function updateDistributionChart (value) {
      var newArray = dataJSON.filter(function (el) {
          return el.startPeriodDate.substring(0, 10).replace(/-/g,"") >= value[0].toISOString().substring(0, 10).replace(/-/g,"") &&
                el.endPeriodDate.substring(0, 10).replace(/-/g,"") <= value[1].toISOString().substring(0, 10).replace(/-/g,"");
        });
        getDistributionChartData(newArray)
        blockingDistributionChart.option('dataSource', listDepartaments);
    }

     getDistributionChartData(dataJSON)


    	const blockingDistributionChart = $('#blocking_distribution_chart').dxChart({
        dataSource: listDepartaments,
        adaptiveLayout: {
        		height: 300,
            keepLabels: true
        },
        barGroupPadding: 0.2,
    		commonSeriesSettings: {
          argumentField: 'departament',
    			type: chartTypes[0],
          barPadding: 0,
          aggregation: {
            enabled: false,
          },
    		},
    		series: [{
    				valueField: 'blocked',
    				name: 'Заблокировано',
            color: '#790a01'
    			},{
    				valueField: 'blockedTrain',
    				name: 'Заблокировано неправомерно',
            color: '#d90202'
    			},{
    				valueField: 'unblocked',
    				name: 'Разблокировано',
            color: '#96a9e9'
    			}],
    		rotated: true,
    		legend: {
          itemTextPosition: 'right',
    			verticalAlignment: 'bottom',
    			horizontalAlignment: 'center',
          // font: {
          //   size: 8
          // }
    		},
    		argumentAxis: {
    			label: {
            visible: true,
    				wordWrap: 'none',
    				overlappingBehavior: 'stagger',
            font: {
              size: 12
            }
    			},
    		},
    		valueAxis: {
          aggregatedPointsPosition: 'crossTicks',
    			title: {
    				text: '',
    			},
    			position: 'left',
    		},
    		title: 'Распределение блокировок',
    		tooltip: {
    			enabled: true,
    			location: 'edge',
    			customizeTooltip(arg) {
    				return {
    					text: `${arg.argument}, ${arg.seriesName}: ${arg.valueText}`,
    				};
    			},
    		},
    		onLegendClick(e) {
    			const series = e.target;
    			if (series.isVisible()) {
    				series.hide();
    			} else {
    				series.show();
    			}
    		},
    	}).dxChart('instance');

    	const btn_change_type = $('#btn_change_type').dxButton({
    		icon: 'chart',
    		text: chartTypes[1],
        // text: `&{return chartTypes[1] ? 'показать абсолютные значения' : 'показать относительные значения'}`
    		onClick() {
    			changeChartType()
    		},
    	}).dxButton('instance');

    	const changeChartType = () => {
    		btn_change_type.option('text', chartTypes[choosedType])
    		choosedType = (choosedType == 0) ? 1 : 0
    		blockingDistributionChart.option('commonSeriesSettings.type', chartTypes[choosedType]);
    	}

    	const listDepartment = ['Роскомнадзор', 'Суд', 'Роспотребнадзор']
    	const listСategory = ['Сategory_1', 'Сategory_2', 'Сategory_3', 'Сategory_4', 'Сategory_5', 'Сategory_6', 'Сategory_7']
    	let dataSourceСategory = []
    	listDepartment.forEach((node) => {
    		let el;
    		listСategory.forEach((item, i) => {
    			el = {
    				departament: node,
    				[item]: getRandomInt()
    			}
    			dataSourceСategory.push(el)
    		});
    	})


  		const chartPeriod = $('#blocking_period_chart').dxChart({
  			palette: 'Harmony Light',
        dataSource: dataJSON,
  			commonSeriesSettings: {
  				point: {
  					size: 0,
  				},
          argumentField: 'startPeriodDate',
  				aggregation: {
  					enabled: true,
  				},
  			},
        argumentAxis: {
          argumentType: 'datetime',
          aggregationInterval: 'week',
          valueMarginsEnabled: true, //false
          label: {
            visible: false,
          },
        },

  			series: [{
  				valueField: 'totalBlocked',
  				name: 'Заблокировано',
          color: '#d90202'
  			}, {
  				valueField: 'totalUnblocked',
  				name: 'Разблокировано',
          color: '#758CDA'
  			}],
  			legend: {
  				visible: false,
  			},

  			title: 'Всего блокировок',
  			tooltip: {
  				enabled: true,
  				location: 'edge',
  				customizeTooltip(arg) {
  					return {
              text: `${arg.seriesName} за неделю: ${arg.valueText}`,
  					};
  				},
  			},
  		}).dxChart('instance');


      $('#range-selector').dxRangeSelector({
        dataSource:dataJSON,
          size: {
            height: 120,
          },
         chart: {
           commonSeriesSettings: {
             type: 'area',
             argumentField: 'startPeriodDate',
           },
           series: [
             {
              valueField: 'totalUnblocked',
               color: '#758CDA'
             },
             { valueField: 'totalBlocked',
             color: '#d90202' },
           ],
           legend: {
     				visible: false,
     			},
         },

         scale: {
           minorTickInterval: 'week',
           tickInterval: 'year',
           valueType: 'datetime',
           aggregationInterval: 'week',
           placeholderHeight: 35,
         },
         sliderMarker: {
           format: 'monthAndDay',
         },
         behavior: {
          callValueChanged: 'onMoving',
          snapToTicks: false,
         },
         onValueChanged(e) {
          chartPeriod.getArgumentAxis().visualRange(e.value);
          updateDistributionChart(e.value)
         },
       });




    	const chartTypesArea = ['stackedsplinearea', 'fullstackedsplinearea']
    	var choosedTypeArea = 0;
    	const categoryСhart = $('#category_chart').dxChart({
    		dataSource: dataSourceСategory,
    		commonSeriesSettings: {
    			argumentField: 'departament',
    			type: chartTypesArea[0],
    		},
    		series: listСategory.map((node) => {
    			let el = {
    				valueField: node,
    				name: node
    			};
    			return el
    		}),
    		legend: {
    			verticalAlignment: 'bottom',
    			horizontalAlignment: 'center',
    		},

    		argumentAxis: {
          aggregatedPointsPosition: 'crossTicks',

    			valueMarginsEnabled: false,
    			label: {
    				wordWrap: 'none',
    				overlappingBehavior: 'stagger',
    			},
    		},
    		valueAxis: {

    			title: {
    				text: 'Количество',
    			},
    			position: 'left',
    		},
    		title: 'Блокировка по категориям',
    		tooltip: {
    			enabled: true,
    			location: 'edge',
    			customizeTooltip(arg) {
    				return {
    					text: `${arg.seriesName}: ${arg.valueText}`,
    				};
    			},
    		},
    		onLegendClick(e) {
    			const series = e.target;
    			if (series.isVisible()) {
    				series.hide();
    			} else {
    				series.show();
    			}
    		},
    	}).dxChart('instance');


    	const btn_change_category = $('#btn_change_category').dxButton({
    		icon: 'chart',
    		text: chartTypesArea[1],
    		onClick() {
    			changeCategoryChartType()
    		},
    	}).dxButton('instance');

    	const changeCategoryChartType = () => {
    		btn_change_category.option('text', chartTypesArea[choosedTypeArea])
    		choosedTypeArea = (choosedTypeArea == 0) ? 1 : 0
    		categoryСhart.option('commonSeriesSettings.type', chartTypesArea[choosedTypeArea]);
    	}


    	const listCompany = ['DigitalOcean', 'CloudFlare', 'Amazon', 'GoDaddy', 'Google', 'Azure']
    	const dataSourceIPStatistics = listCompany.map((node) => {
    		let el = {
    			nameCompany: node,
    			blocked: getRandomInt(),
    		}
    		return el
    	}).sort((a, b) => a.blocked - b.blocked)

    	const ipStatisticsChart = $('#ip_statistics_chart').dxChart({
    		dataSource: dataSourceIPStatistics,
    		commonSeriesSettings: {
    			argumentField: 'nameCompany',
    			type: 'bar',
    		},
    		series: [{
    			valueField: 'blocked',
    			name: 'Заблокировано',
          color: '#96a9e9'
    		}],
    		rotated: true,
    		legend: {
    			visible: false,
    		},
    		argumentAxis: {
    			label: {
    				wordWrap: 'none',
    				overlappingBehavior: 'stagger',
    			},
    		},
    		title: 'Статистика по IP-адресам',
    		tooltip: {
    			enabled: true,
    			location: 'edge',
    			customizeTooltip(arg) {
    				return {
    					text: `${arg.seriesName}: ${arg.valueText}`,
    				};
    			},
    		},
    		onLegendClick(e) {
    			const series = e.target;
    			if (series.isVisible()) {
    				series.hide();
    			} else {
    				series.show();
    			}
    		},
    	}).dxChart('instance');
  })

});
