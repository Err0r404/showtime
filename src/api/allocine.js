import moment from 'moment';
import Base64 from 'crypto-js/enc-base64';
import sha1 from 'crypto-js/sha1';
import httpBuildQuery from 'http-build-query'

class AlloCine {
    constructor(partnerKey, secretKey) {
        this.apiUrl = "http://api.allocine.fr/rest/v3";
        this.userAgent = "Dalvik/1.6.0 (Linux; U; Android 4.2.2; Nexus 4 Build/JDQ39E)";

        this._partnerKey = '100043982026';
        this._secretKey = '29d185d98c984a359e6e6f26a0474269';
        this._defaultRadius = 10;
    }

    _prepareRequest(endPoint, params = {}) {
        // Add required params value
        params.partner = this._partnerKey;

        // Build URL
        let queryUrl = this.apiUrl + '/' + endPoint;

        // Build query
        let sed = moment().format('YYYYMMDD');
        let sign = encodeURIComponent(
            Base64.stringify(
                sha1(this._secretKey + httpBuildQuery(params) + '&sed=' + sed)
            )
        );
        queryUrl += '?' + httpBuildQuery(params) + '&sed=' + sed + '&sig=' + sign;
        // console.log('URL', queryUrl);

        return queryUrl;
    }

    theaterList(zip, lat, long) {
        const params = {
            zip,
            lat,
            long,
            radius: this._defaultRadius,
            theater: '',
            location: '',
            format: 'json',
        };

        return this._prepareRequest('theaterlist', params);
    }

    showtimeList(cinemaCode = '', movieCode = '', date = moment().format('YYYY-MM-DD')) {
        const params = {
            zip: '',
            lat: '',
            long: '',
            radius: this._defaultRadius,
            theaters: cinemaCode,
            location: '',
            movie: movieCode,
            date, // YYYY-MM-DD
            format: 'json',
        };

        return this._prepareRequest('showtimelist', params);
    }

    movie(movieCode = ''){
        const params = {
            code: movieCode,
            profile: 'large',
            filter: 'movie',
            striptags: 'synopsis',
            format: 'json',
        };

        return this._prepareRequest('movie', params);
    }
}

export default AlloCine;