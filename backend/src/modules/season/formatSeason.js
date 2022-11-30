export default (season) => {
    return {
        id: season._id,
        name: season.name,
        dateStart: new Date(season.dateStart).toISOString(),
        dateEnd: new Date(season.dateEnd).toISOString(),
    }
}