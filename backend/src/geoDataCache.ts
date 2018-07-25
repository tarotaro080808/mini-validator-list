const geoDataMock = {
  lastUpdated: new Date(),
  list: [
    {
      domain: "kryptox.in",
      ip: "139.59.45.38",
      country_name: "India",
      region_name: "Karnataka",
      city: "Bengaluru",
      latitude: 12.9833,
      longitude: 77.5833
    },
    {
      domain: "seow.cloud",
      ip: "158.140.207.138",
      country_name: "Australia",
      region_name: "Victoria",
      city: "Dandenong",
      latitude: -37.9833,
      longitude: 145.2
    },
    {
      domain: "ipayinstant.com",
      ip: "52.76.10.45",
      country_name: "Singapore",
      region_name: "Central Singapore Community Development Council",
      city: "Singapore",
      latitude: 1.2931,
      longitude: 103.8558
    },
    {
      domain: "xrp-france.eu",
      ip: "37.97.84.156",
      country_name: "France",
      region_name: "Île-de-France",
      city: "Paris",
      latitude: 48.8628,
      longitude: 2.3292
    },
    {
      domain: "singapore.ripplenet.se",
      ip: "207.148.117.220",
      country_name: "Singapore",
      region_name: "Central Singapore Community Development Council",
      city: "Singapore",
      latitude: 1.2931,
      longitude: 103.8558
    },
    {
      domain: "9grid.fr",
      ip: "148.251.74.45",
      country_name: "Germany",
      region_name: null,
      city: null,
      latitude: 51.2993,
      longitude: 9.491
    },
    {
      domain: "codius01.honeymonster11.co.uk",
      ip: "178.128.160.102",
      country_name: "United Kingdom",
      region_name: "England",
      city: "London",
      latitude: 51.5142,
      longitude: -0.0931
    },
    {
      domain: "certic.info",
      ip: "31.193.170.5",
      country_name: "United Kingdom",
      region_name: null,
      city: null,
      latitude: 51.4964,
      longitude: -0.1224
    },
    {
      domain: "xrp.works",
      ip: "18.216.57.150",
      country_name: "United States",
      region_name: "Ohio",
      city: "Columbus",
      latitude: 39.9653,
      longitude: -83.0235
    },
    {
      domain: "xrpvalidate.com",
      ip: "188.166.128.7",
      country_name: "Netherlands",
      region_name: "North Holland",
      city: "Amsterdam",
      latitude: 52.2965,
      longitude: 4.9542
    },
    {
      domain: "zapster.io",
      ip: "51.140.44.224",
      country_name: "United Kingdom",
      region_name: "England",
      city: "London",
      latitude: 51.5142,
      longitude: -0.0931
    },
    {
      domain: "ripple.phraust.com",
      ip: "159.65.78.161",
      country_name: "United States",
      region_name: "California",
      city: "Santa Clara",
      latitude: 37.3501,
      longitude: -121.9854
    },
    {
      domain: "cinnapple.fun",
      ip: "45.32.128.35",
      country_name: "United States",
      region_name: "California",
      city: "San Jose",
      latitude: 37.3387,
      longitude: -121.8914
    },
    {
      domain: "validator.xrptipbot.com",
      ip: "104.27.152.162",
      country_name: "United States",
      region_name: null,
      city: null,
      latitude: 37.751,
      longitude: -97.822
    },
    {
      domain: "rabbitkick.club",
      ip: "45.63.70.192",
      country_name: "United States",
      region_name: "Illinois",
      city: "Elk Grove Village",
      latitude: 42.0152,
      longitude: -87.9901
    },
    {
      domain: "blockchain.korea.ac.kr",
      ip: "163.152.127.125",
      country_name: "Republic of Korea",
      region_name: "Seoul",
      city: "Seoul",
      latitude: 37.5985,
      longitude: 126.9783
    },
    {
      domain: "de.xrp.validators.network",
      ip: "209.250.233.103",
      country_name: "Germany",
      region_name: "Hesse",
      city: "Frankfurt am Main",
      latitude: 50.1137,
      longitude: 8.7119
    },
    {
      domain: "arialase.com",
      ip: "198.71.233.1",
      country_name: "United States",
      region_name: "Arizona",
      city: "Scottsdale",
      latitude: 33.6119,
      longitude: -111.8906
    },
    {
      domain: "ifconfig.se",
      ip: "45.63.115.202",
      country_name: "France",
      region_name: null,
      city: null,
      latitude: 48.8582,
      longitude: 2.3387000000000002
    },
    {
      domain: "www.ripplevalidator.nl",
      ip: "85.214.123.131",
      country_name: "Germany",
      region_name: "Land Berlin",
      city: "Berlin",
      latitude: 52.5167,
      longitude: 13.4
    },
    {
      domain: "data443.com",
      ip: "104.211.16.160",
      country_name: "United States",
      region_name: "Virginia",
      city: "Washington",
      latitude: 38.7163,
      longitude: -78.1704
    },
    {
      domain: "phobosnode.com",
      ip: "136.33.83.56",
      country_name: "United States",
      region_name: "Missouri",
      city: "Kansas City",
      latitude: 39.2116,
      longitude: -94.5739
    },
    {
      domain: "rippled.xrpthestandard.ch",
      ip: "178.128.200.156",
      country_name: "Germany",
      region_name: "Hesse",
      city: "Frankfurt am Main",
      latitude: 50.1153,
      longitude: 8.6823
    },
    {
      domain: "bitso.com",
      ip: "104.20.11.111",
      country_name: "United States",
      region_name: null,
      city: null,
      latitude: 37.751,
      longitude: -97.822
    },
    {
      domain: "ripple.com",
      ip: "54.148.84.63",
      country_name: "United States",
      region_name: "Oregon",
      city: "Boardman",
      latitude: 45.8696,
      longitude: -119.688
    },
    {
      domain: "ripple.nycvalidator.io",
      ip: "206.81.11.51",
      country_name: "United States",
      region_name: "New Jersey",
      city: "North Bergen",
      latitude: 40.7904,
      longitude: -74.0246
    },
    {
      domain: "rippled.catopsis.net",
      ip: "62.210.146.157",
      country_name: "France",
      region_name: null,
      city: null,
      latitude: 48.8582,
      longitude: 2.3387000000000002
    },
    {
      domain: "wietse.com",
      ip: "188.166.128.7",
      country_name: "Netherlands",
      region_name: "North Holland",
      city: "Amsterdam",
      latitude: 52.2965,
      longitude: 4.9542
    },
    {
      domain: "rippled.aussiexrp.info",
      ip: "178.128.29.110",
      country_name: "Singapore",
      region_name: "Central Singapore Community Development Council",
      city: "Singapore",
      latitude: 1.2931,
      longitude: 103.8558
    },
    {
      domain: "flagshipsolutionsgroup.com",
      ip: "70.40.212.206",
      country_name: "United States",
      region_name: "Utah",
      city: "Provo",
      latitude: 40.2181,
      longitude: -111.6133
    },
    {
      domain: "xrpiceland.net",
      ip: "217.70.186.114",
      country_name: "France",
      region_name: null,
      city: null,
      latitude: 48.8582,
      longitude: 2.3387000000000002
    },
    {
      domain: "codius.dadadollar.com",
      ip: "79.143.183.118",
      country_name: "Germany",
      region_name: null,
      city: null,
      latitude: 51.2993,
      longitude: 9.491
    },
    {
      domain: "ripple.telinduscloud.lu",
      ip: "31.204.88.77",
      country_name: "Luxembourg",
      region_name: "Luxembourg",
      city: "Luxembourg",
      latitude: 49.6117,
      longitude: 6.13
    },
    {
      domain: "www.bahnhof.se",
      ip: "213.136.63.73",
      country_name: "Sweden",
      region_name: "Stockholm",
      city: "Solna",
      latitude: 59.3667,
      longitude: 18.0167
    },
    {
      domain: "xrp.rigby.me",
      ip: "159.65.0.167",
      country_name: "Singapore",
      region_name: "Central Singapore Community Development Council",
      city: "Singapore",
      latitude: 1.2931,
      longitude: 103.8558
    },
    {
      domain: "ripple.daneb.earth",
      ip: "46.38.249.187",
      country_name: "Germany",
      region_name: null,
      city: null,
      latitude: 51.2993,
      longitude: 9.491
    },
    {
      domain: "r.sparkwired.com",
      ip: "35.204.160.56",
      country_name: null,
      region_name: null,
      city: null,
      latitude: 47,
      longitude: 8
    },
    {
      domain: "validator1.ripplexrp.network",
      ip: "209.182.233.220",
      country_name: "United States",
      region_name: "Texas",
      city: "Dallas",
      latitude: 32.7825,
      longitude: -96.8207
    },
    {
      domain: "xrp.ninja",
      ip: "35.227.151.239",
      country_name: "United States",
      region_name: "California",
      city: "Mountain View",
      latitude: 37.419200000000004,
      longitude: -122.0574
    },
    {
      domain: "brex.io",
      ip: "213.208.154.37",
      country_name: "Austria",
      region_name: null,
      city: null,
      latitude: 48.2,
      longitude: 16.3667
    },
    {
      domain: "validator1.worldlink-us.com",
      ip: "47.90.214.85",
      country_name: "United States",
      region_name: "California",
      city: "San Mateo",
      latitude: 37.526,
      longitude: -122.3558
    },
    {
      domain: "foxrp.org",
      ip: "45.55.22.252",
      country_name: "United States",
      region_name: "California",
      city: "San Francisco",
      latitude: 37.7353,
      longitude: -122.3732
    },
    {
      domain: "www.attokyo.com",
      ip: "165.100.251.216",
      country_name: "Japan",
      region_name: null,
      city: null,
      latitude: 35.69,
      longitude: 139.69
    },
    {
      domain: "xrp.doark.se",
      ip: "165.227.146.227",
      country_name: "Germany",
      region_name: "Hesse",
      city: "Frankfurt am Main",
      latitude: 50.1153,
      longitude: 8.6823
    },
    {
      domain: "validator.mcardle.rs",
      ip: "178.222.87.168",
      country_name: "Serbia",
      region_name: "Belgrade",
      city: "Belgrade",
      latitude: 44.8186,
      longitude: 20.4681
    },
    {
      domain: "rippled.boldcoins.com.br",
      ip: "206.189.226.5",
      country_name: "United States",
      region_name: "New York",
      city: "New York",
      latitude: 40.7662,
      longitude: -73.9862
    },
    {
      domain: "s2.dotorie.com",
      ip: "61.74.211.23",
      country_name: "Republic of Korea",
      region_name: "Seoul",
      city: null,
      latitude: 37.4951,
      longitude: 127.0628
    },
    {
      domain: "bithomp.com",
      ip: "138.201.86.22",
      country_name: "Germany",
      region_name: null,
      city: null,
      latitude: 51.2993,
      longitude: 9.491
    },
    {
      domain: "xrp.intellibrain.ch",
      ip: "46.101.249.4",
      country_name: "Germany",
      region_name: "Hesse",
      city: "Frankfurt am Main",
      latitude: 50.1167,
      longitude: 8.6833
    },
    {
      domain: "xrp.peglegg.net",
      ip: "104.28.12.27",
      country_name: "United States",
      region_name: null,
      city: null,
      latitude: 37.751,
      longitude: -97.822
    },
    {
      domain: "rippled.fr",
      ip: "163.172.136.252",
      country_name: "France",
      region_name: null,
      city: null,
      latitude: 48.8582,
      longitude: 2.3387000000000002
    },
    {
      domain: "rippleitin.nz",
      ip: "203.86.202.165",
      country_name: "New Zealand",
      region_name: null,
      city: null,
      latitude: -41,
      longitude: 174
    },
    {
      domain: "s1.dotorie.com",
      ip: "121.134.105.106",
      country_name: "Republic of Korea",
      region_name: "Seoul",
      city: "Seoul",
      latitude: 37.5985,
      longitude: 126.9783
    },
    {
      domain: "tripsite.com",
      ip: "169.53.49.84",
      country_name: "United States",
      region_name: "Texas",
      city: "Dallas",
      latitude: 32.7787,
      longitude: -96.8217
    },
    {
      domain: "xrpn.io",
      ip: "5.225.108.36",
      country_name: "Spain",
      region_name: "Navarre",
      city: "Burlata",
      latitude: 42.8256,
      longitude: -1.6167
    },
    {
      domain: "ripple.dizerpro.io",
      ip: "159.203.74.73",
      country_name: "United States",
      region_name: "New Jersey",
      city: "Clifton",
      latitude: 40.8326,
      longitude: -74.1307
    },
    {
      domain: "xrpvalidator.kingbluexrp.com",
      ip: "159.65.78.247",
      country_name: "United States",
      region_name: "California",
      city: "Santa Clara",
      latitude: 37.3501,
      longitude: -121.9854
    },
    {
      domain: "mtdew.scheetz.rocks",
      ip: "138.68.42.36",
      country_name: "United States",
      region_name: "California",
      city: "Santa Clara",
      latitude: 37.3501,
      longitude: -121.9854
    },
    {
      domain: "xrp.codius.space",
      ip: "206.81.12.208",
      country_name: "United States",
      region_name: "New York",
      city: "New York",
      latitude: 40.7214,
      longitude: -74.0052
    },
    {
      domain: "validator01.xrppartner.com",
      ip: "178.128.70.122",
      country_name: "United States",
      region_name: "California",
      city: "Santa Clara",
      latitude: 37.3501,
      longitude: -121.9854
    },
    {
      domain: "brainraid.com",
      ip: "162.243.105.109",
      country_name: "United States",
      region_name: "New York",
      city: "New York",
      latitude: 40.7308,
      longitude: -73.9975
    },
    {
      domain: "ripple2.swissvon.ch",
      ip: "46.20.241.181",
      country_name: "Switzerland",
      region_name: "Geneva",
      city: "Geneva",
      latitude: 46.1956,
      longitude: 6.1481
    },
    {
      domain: "xrp.barri.club",
      ip: "188.166.122.150",
      country_name: "Netherlands",
      region_name: "North Holland",
      city: "Amsterdam",
      latitude: 52.3529,
      longitude: 4.9415
    },
    {
      domain: "ripple.xrpcode.io",
      ip: "206.189.71.5",
      country_name: "United States",
      region_name: "California",
      city: "Santa Clara",
      latitude: 37.3501,
      longitude: -121.9854
    },
    {
      domain: "tmack-xrpvalidator.btmack.org",
      ip: "138.197.185.121",
      country_name: "Germany",
      region_name: "Hesse",
      city: "Frankfurt am Main",
      latitude: 50.1167,
      longitude: 8.6833
    }
  ]
};

export { geoDataMock };
