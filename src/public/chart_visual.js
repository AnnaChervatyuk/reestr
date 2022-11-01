$(() => {

function getRandomInt() {
  return Math.floor(Math.random() * 200000);
}
const listMonth = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']

const chartTypes = [{type:'stackedBar', name: 'число', icon:'percent'}, {type:'fullStackedBar', name: 'процент', icon:'percent'}]
var choosedType = 0;

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
    			type: chartTypes[0].type,
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
    		text: chartTypes[1].name,
    		onClick() {
    			changeChartType()
    		},
    	}).dxButton('instance');

    	const changeChartType = () => {
    		btn_change_type.option('text', chartTypes[choosedType].name)
    		choosedType = (choosedType == 0) ? 1 : 0
    		blockingDistributionChart.option('commonSeriesSettings.type', chartTypes[choosedType].type);
    	}



  		const chartPeriod = $('#blocking_period_chart').dxChart({
  			palette: 'Harmony Light',
        dataSource: dataJSON,
        // height: 200,
        size: {
            height: 175,
        },
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
          valueMarginsEnabled: true,
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
            height: 80,
          },
         scale: {
           startValue: dataJSON[0].startPeriodDate,
           endValue:  dataJSON[dataJSON.length-1].endPeriodDate,
           minorTickInterval: 'week',
           tickInterval: 'year',
           valueType: 'datetime',
           aggregationInterval: 'week',
           placeholderHeight: 15,
           minorTick: {
            visible: false,
          },
         },
         sliderMarker: {
           customizeText() {
             var d = new Date(this.value);
              return `${listMonth[d.getMonth()]} ${d.getFullYear()}`;
            },
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

})

      $.getJSON( "./data_ip.json", function( json ) {
        let dataIPJSON = json.sort((a, b) => a.ip_count - b.ip_count);
          $('#ip_statistics_chart').dxChart({
            dataSource: dataIPJSON,
            commonSeriesSettings: {
              argumentField: 'company_name',
              type: 'bar',
              aggregation: {
                enabled: true,
              },
            },

            series: [{
              valueField: 'ip_count',
              name: 'Заблокировано',
              color: '#96a9e9'
            }],
            valueAxis: {
              valueType: 'numeric',
            },
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
          });
  })



});
