
$(() => {
    function getRandomInt() {
      return Math.floor(Math.random() * 200000);
    }
    const listDepartments = ['Генпрокуратура', 'МВД', 'Минкомсвязь','Мосгорсуд', 'Росалкогольрегулирование','Росздравнадзор','Роскомнадзор','Росмолодежь','Роспотребнадзор','ФНС','ФСКН','Суд']

    // const blockingDistributionDataSource = listDepartments.map((node)=>{
    //   let el = {departament:node, totalBlocked:getRandomInt(), totalUnblocked:getRandomInt(), totalBlockedTrain:getRandomInt()}
    //   return el
    // }).sort((a, b) => (a.totalBlocked +a.totalUnblocked + a.totalBlockedTrain)- (b.totalBlocked +b.totalUnblocked + b.totalBlockedTrain))

  function setBlockingDistributionDataSource () {
    return listDepartments.map((node)=>{
      let el = {departament:node, totalBlocked:getRandomInt(), totalUnblocked:getRandomInt(), totalBlockedTrain:getRandomInt()}
      return el
    }).sort((a, b) => (a.totalBlocked +a.totalUnblocked + a.totalBlockedTrain)- (b.totalBlocked +b.totalUnblocked + b.totalBlockedTrain))
  }
  const chartTypes = ['stackedBar', 'fullStackedBar']
  var choosedType = 0;
  const blockingDistributionChart = $('#blocking_distribution_chart').dxChart({
    dataSource: setBlockingDistributionDataSource(),
    commonSeriesSettings: {
      argumentField: 'departament',
      type: chartTypes[0],
    },
    series: [{ valueField: 'totalBlocked', name: 'Заблокировано' },
      { valueField: 'totalUnblocked', name: 'Разблокировано' },
      { valueField: 'totalBlockedTrain', name: 'Заблокировано неправомерно' }],
    rotated: true,
    legend: {
      verticalAlignment: 'bottom',
      horizontalAlignment: 'center',
    },
    argumentAxis: {
      label: {
        wordWrap: 'none',
        overlappingBehavior: 'stagger',
      },
    },
    valueAxis: {
      title: {
        text: 'количество',
      },
      position: 'left',
    },
    title: 'Распределение блокировок',
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
  const btn_change_type = $('#btn_change_type').dxButton({
    icon: 'chart',
    text: chartTypes[1],
    onClick() {
      changeChartType()
    },
  }).dxButton('instance');

  const changeChartType = () => {
    btn_change_type.option('text', chartTypes[choosedType])
    choosedType = (choosedType == 0) ?  1 : 0
    blockingDistributionChart.option('commonSeriesSettings.type', chartTypes[choosedType]);
  }

  const listDepartment = ['Роскомнадзор', 'Суд', 'Роспотребнадзор']
  const listСategory = ['Сategory_1', 'Сategory_2', 'Сategory_3', 'Сategory_4', 'Сategory_5', 'Сategory_6', 'Сategory_7']
  let dataSourceСategory = []
  listDepartment.forEach((node)=>{
    let el;
    listСategory.forEach((item, i) => {
      el = {departament: node, [item]: getRandomInt()}
      dataSourceСategory.push(el)
    });
  })




  const dateList = [
    '04/23/2013', '04/22/2013', '04/21/2013', '04/18/2013', '04/17/2013', '04/16/2013', '04/15/2013', '04/14/2013', '04/11/2013', '04/10/2013', '04/09/2013', '04/08/2013', '04/07/2013', '04/04/2013', '04/03/2013', '04/02/2013', '04/01/2013', '03/31/2013', '03/27/2013', '03/26/2013', '03/25/2013', '03/24/2013', '03/21/2013', '03/20/2013', '03/19/2013', '03/18/2013', '03/17/2013', '03/14/2013', '03/13/2013', '03/12/2013', '03/11/2013', '03/10/2013', '03/07/2013', '03/06/2013', '03/05/2013', '03/04/2013', '03/03/2013', '02/28/2013', '02/27/2013', '02/26/2013', '02/25/2013', '02/24/2013', '02/21/2013', '02/20/2013', '02/19/2013', '02/18/2013', '02/14/2013', '02/13/2013', '02/12/2013', '02/11/2013', '02/10/2013', '02/07/2013', '02/06/2013', '02/05/2013', '02/04/2013', '02/03/2013', '01/31/2013', '01/30/2013', '01/29/2013', '01/28/2013', '01/27/2013', '01/24/2013', '01/23/2013', '01/22/2013', '01/21/2013', '01/17/2013', '01/16/2013', '01/15/2013', '01/14/2013', '01/13/2013', '01/10/2013', '01/09/2013', '01/08/2013', '01/07/2013', '01/06/2013', '01/03/2013', '01/02/2013', '01/01/2013', '12/30/2012', '12/27/2012', '12/26/2012', '12/25/2012', '12/23/2012', '12/20/2012', '12/19/2012', '12/18/2012', '12/17/2012', '12/16/2012', '12/13/2012', '12/12/2012', '12/11/2012', '12/10/2012', '12/09/2012', '12/06/2012', '12/05/2012', '12/04/2012', '12/03/2012', '12/02/2012', '11/29/2012', '11/28/2012', '11/27/2012', '11/26/2012', '11/25/2012', '11/22/2012', '11/20/2012', '11/19/2012', '11/18/2012', '11/15/2012', '11/14/2012', '11/13/2012', '11/12/2012', '11/11/2012', '11/08/2012', '11/07/2012', '11/06/2012', '11/05/2012', '11/04/2012', '11/01/2012', '10/31/2012', '10/30/2012', '10/25/2012', '10/24/2012', '10/23/2012', '10/22/2012', '10/21/2012', '10/18/2012', '10/17/2012', '10/16/2012', '10/15/2012', '10/14/2012', '10/11/2012', '10/10/2012', '10/09/2012', '10/08/2012', '10/07/2012', '10/04/2012', '10/03/2012', '10/02/2012', '10/01/2012', '09/30/2012', '09/27/2012', '09/26/2012', '09/25/2012', '09/24/2012', '09/23/2012', '09/20/2012', '09/19/2012', '09/18/2012', '09/17/2012', '09/16/2012', '09/13/2012', '09/12/2012', '09/11/2012', '09/10/2012', '09/09/2012', '09/06/2012', '09/05/2012', '09/04/2012', '09/03/2012', '08/30/2012', '08/29/2012', '08/28/2012', '08/27/2012', '08/26/2012', '08/23/2012', '08/22/2012', '08/21/2012', '08/20/2012', '08/19/2012', '08/16/2012', '08/15/2012', '08/14/2012', '08/13/2012', '08/12/2012', '08/09/2012', '08/08/2012', '08/07/2012', '08/06/2012', '08/05/2012', '08/02/2012', '08/01/2012', '07/31/2012', '07/30/2012', '07/29/2012', '07/26/2012', '07/25/2012', '07/24/2012', '07/23/2012', '07/22/2012', '07/19/2012', '07/18/2012', '07/17/2012', '07/16/2012', '07/15/2012', '07/12/2012', '07/11/2012', '07/10/2012', '07/09/2012', '07/08/2012', '07/05/2012', '07/04/2012', '07/02/2012', '07/01/2012', '06/28/2012', '06/27/2012', '06/26/2012', '06/25/2012', '06/24/2012', '06/21/2012', '06/20/2012', '06/19/2012', '06/18/2012', '06/17/2012', '06/14/2012', '06/13/2012', '06/12/2012', '06/11/2012', '06/10/2012', '06/07/2012', '06/06/2012', '06/05/2012', '06/04/2012', '06/03/2012', '05/31/2012', '05/30/2012', '05/29/2012', '05/28/2012', '05/24/2012', '05/23/2012', '05/22/2012', '05/21/2012', '05/20/2012', '05/17/2012', '05/16/2012', '05/15/2012', '05/14/2012', '05/13/2012', '05/10/2012', '05/09/2012', '05/08/2012', '05/07/2012', '05/06/2012', '05/03/2012', '05/02/2012', '05/01/2012', '04/30/2012', '04/29/2012', '04/26/2012', '04/25/2012'];

  let dataSource = []
  dateList.forEach((item, i) => {
    let el = {Date: item, blocked: getRandomInt(), unblocked: getRandomInt()};
    dataSource.push(el)
  });


  $(() => {
    const chartPeriod = $('#blocking_period_chart').dxChart({
      palette: 'Harmony Light',
      dataSource: dataSource,
      commonSeriesSettings: {
        point: {
          size: 7,
          color: 'transparent'
        },

        argumentField: 'Date',
        aggregation: {
          enabled: true,
        },
      },
      series: [{ valueField: 'blocked', name: 'Заблокировано'}, { valueField: 'unblocked', name: 'Разблокировано'}],
      legend: {
        visible: false,
      },
      argumentAxis: {
        grid: {
          visible: true,
        },
        label: {
          visible: false,
        },
        valueMarginsEnabled: false,
        argumentType: 'datetime',

      },
      title: 'Всего блокировок',
      tooltip: {
        enabled: true,
        location: 'edge',
        customizeTooltip(arg) {
          return {
            text: `${arg.seriesName}: ${arg.valueText}`,
          };
        },
      },
    }).dxChart('instance');


    $('#range-selector').dxRangeSelector({
    size: {
      height: 120,
    },
    dataSource,
    sliderMarker: {
      format: 'monthAndDay'
    },
    chart: {
      commonSeriesSettings: {
        argumentField: 'Date',
        type: 'area',
        aggregation: {
          enabled: true,
        },
      },
      valueAxis: { valueType: 'numeric' },
      series: [{ valueField: 'blocked', name: 'blocked'}, { valueField: 'unblocked', name: 'unblocked'}]
    },

    scale: {
      minorTickInterval: 'week',
      tickInterval: 'year',
      valueType: 'datetime',
      aggregationInterval: 'week',
      placeholderHeight: 20,
    },

    behavior: {
      callValueChanged: 'onMoving',
      snapToTicks: false,
    },
    onValueChanged(e) {
      console.log('e', e)
      chartPeriod.getArgumentAxis().visualRange(e.value);
      blockingDistributionChart.option('dataSource',setBlockingDistributionDataSource());
    },
  });
  });




  const chartTypesArea = ['stackedsplinearea', 'fullstackedsplinearea']
  var choosedTypeArea = 0;
    const categoryСhart = $('#category_chart').dxChart({
      dataSource: dataSourceСategory,
      commonSeriesSettings: {
        argumentField: 'departament',
        type: chartTypesArea[0],
      },
      series: listСategory.map((node)=>{let el = { valueField: node, name: node }; return el}),
      legend: {
        verticalAlignment: 'bottom',
        horizontalAlignment: 'center',
      },

      argumentAxis: {
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
      choosedTypeArea = (choosedTypeArea == 0) ?  1 : 0
      categoryСhart.option('commonSeriesSettings.type', chartTypesArea[choosedTypeArea]);
    }


    const listCompany = ['DigitalOcean', 'CloudFlare', 'Amazon','GoDaddy', 'Google','Azure']
    const dataSourceIPStatistics = listCompany.map((node)=>{
      let el = {nameCompany:node, totalBlocked:getRandomInt(), }
      return el
    }).sort((a, b) => a.totalBlocked - b.totalBlocked)

    const ipStatisticsChart = $('#ip_statistics_chart').dxChart({
      dataSource: dataSourceIPStatistics,
      commonSeriesSettings: {
        argumentField: 'nameCompany',
        type: 'bar',
      },
      series: [{ valueField: 'totalBlocked', name: 'Заблокировано'}],
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
  });
