
$(() => {
  const dataSource = [{
    state: 'Генпрокуратура',
    totalBlocked: 67994,
    totalUnblocked: 104891,
    totalBlockedTrain: 896258,
  }, {
    state: 'МВД',
    totalBlocked: 17665,
    totalUnblocked: 46705,
    totalBlockedTrain: 1253973,
  }, {
    state: 'Минкомсвязь',
    totalBlocked: 43275,
    totalUnblocked: 65,
    totalBlockedTrain: 346902,
  }, {
    state: 'Мосгорсуд',
    totalBlocked: 44210,
    totalUnblocked: 116775,
    totalBlockedTrain: 295063,
  }, {
    state: 'Росалкогольрегулирование',
    totalBlocked: 3965,
    totalUnblocked: 8147,
    totalBlockedTrain: 84010,
  }, {
    state: 'Росздравнадзор',
    totalBlocked: 8639,
    totalUnblocked: 5852,
    totalBlockedTrain: 12139,
  }, {
    state: 'Роскомнадзор',
    totalBlocked: 26148,
    totalUnblocked: 39758,
    totalBlockedTrain: 584774,
  }, {
    state: 'Росмолодежь',
    totalBlocked: 290,
    totalUnblocked: 117,
    totalBlockedTrain: 927,
  }, {
    state: 'Роспотребнадзор',
    totalBlocked: 0,
    totalUnblocked: 0,
    totalBlockedTrain: 0,
  }, {
    state: 'ФНС',
    totalBlocked: 292058,
    totalUnblocked: 62625,
    totalBlockedTrain: 2832674,
  }, {
    state: 'ФСКН',
    totalBlocked: 453,
    totalUnblocked: 26962,
    totalBlockedTrain: 906268,
  }, {
    state: 'Суд',
    totalBlocked: 20240,
    totalUnblocked: 147474,
    totalBlockedTrain: 3795718,
  }];
  const chartTypes = ['stackedBar', 'fullStackedBar']
  var choosedType = 0;
  const chart = $('#chart').dxChart({
    dataSource,
    commonSeriesSettings: {
      argumentField: 'state',
      type: chartTypes[0],
    },
    series: [{ valueField: 'totalBlocked', name: 'Заблокировано' },
      { valueField: 'totalUnblocked', name: 'Разблокировано' },
      { valueField: 'totalBlockedTrain', name: 'Заблокировано неправомерно' }],
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
    title: 'блокировки',
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
    chart.option('commonSeriesSettings.type', chartTypes[choosedType]);

  }
});
