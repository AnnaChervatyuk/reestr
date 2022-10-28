
$(() => {
    function getRandomInt() {
      return Math.floor(Math.random() * 200000);
    }
    const listDepartments = ['Генпрокуратура', 'МВД', 'Минкомсвязь','Мосгорсуд', 'Росалкогольрегулирование','Росздравнадзор','Роскомнадзор','Росмолодежь','Роспотребнадзор','ФНС','ФСКН','Суд']

    const blockingDistributionDataSource = listDepartments.map((node)=>{
      let el = {departament:node, totalBlocked:getRandomInt(), totalUnblocked:getRandomInt(), totalBlockedTrain:getRandomInt()}
      return el
    }).sort((a, b) => (a.totalBlocked +a.totalUnblocked + a.totalBlockedTrain)- (b.totalBlocked +b.totalUnblocked + b.totalBlockedTrain))

  const chartTypes = ['stackedBar', 'fullStackedBar']
  var choosedType = 0;
  const blockingDistributionChart = $('#blocking_distribution_chart').dxChart({
    dataSource: blockingDistributionDataSource,
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

    const categoryСhart = $('#category_chart').dxChart({
      dataSource: dataSourceСategory,
      commonSeriesSettings: {
        argumentField: 'departament',
        type: 'area',
      },
      series: listСategory.map((node)=>{let el = { valueField: node, name: node }; return el}),
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
