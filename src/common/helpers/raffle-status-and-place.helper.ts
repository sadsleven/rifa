export function getStatus(row) {
  const awarded = row.resultsPlaces.filter((e) => e.awardStatus !== 'unknown');
  if (awarded.length < 1) {
    return 'Pendiente';
  }
  return awarded.some((e) => e.awardStatus === 'winner')
    ? 'Ganador'
    : 'Perdedor';
}

export function GetAwardedPlace(row) {
  const index = row.resultsPlaces.findIndex((e) => e.awardStatus === 'winner');
  switch (index) {
    case 0:
      return 'Número exacto';
    case 1:
      return 'Aproximación superior';
    case 2:
      return 'Aproximación inferior';
    default:
      return 'Terminales';
    case -1:
      return 'No disponible';
  }
}
