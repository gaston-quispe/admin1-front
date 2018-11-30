import moment from 'moment'

class Utils {
    //constructor() {}

    // YYYY-DD-MM to YYYY-MM-DD
    YYYYDDMM_to_YYYYMMDD(fecha) {
        return moment(fecha, 'YYYY-DD-MM').format('YYYY-MM-DD')
    }

    YYYYMMDD_to_YYYYDDMM(fecha) {
        return moment(fecha, 'YYYY-MM-DD').format('YYYY-DD-MM')
    }

    YYYYDDMM_to_UI(fecha) {
        return moment(fecha, 'YYYY-DD-MM').format('DD/MM/YYYY')
    }
  
}

export default new Utils();