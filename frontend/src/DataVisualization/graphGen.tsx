import Chart from 'chart.js/auto'

const graphGen = () => {

    let testList = {
        '0': [
            {
                generation: '0',
                'Final Drive': '1.5690293474575492',
                'Roll Radius': '0.2566415050917073',
                'Gear 3': '1.974057789026803',
                'Gear 4': '0.921010136780148',
                'Gear 5': '0.6835894874067268',
                Consumption: '1.092945',
                'Elasticity 3': '26.32',
                'Elasticity 4': '120.88',
                'Elasticity 5': '212.9'
            },
            {
                generation: '0',
                'Final Drive': '4.069029347457549',
                'Roll Radius': '0.3121970606472628',
                'Gear 3': '1.5017713055885449',
                'Gear 4': '1.3495815653515764',
                'Gear 5': '1.0740577890268022',
                Consumption: '1.582032',
                'Elasticity 3': '10.0',
                'Elasticity 4': '12.39',
                'Elasticity 5': '19.57'
            },
            {
                generation: '0',
                'Final Drive': '3.1315293474575494',
                'Roll Radius': '0.4121970606472629',
                'Gear 3': '1.674057789026803',
                'Gear 4': '1.1352958510658624',
                'Gear 5': '0.9563167601339995',
                Consumption: '1.216769',
                'Elasticity 3': '23.71',
                'Elasticity 4': '51.49',
                'Elasticity 5': '72.56'
            },
            {
                generation: '0',
                'Final Drive': '5.631529347457549',
                'Roll Radius': '0.21219706064726285',
                'Gear 3': '1.7744985783158178',
                'Gear 4': '1.3740577890268029',
                'Gear 5': '0.5230509531066786',
                Consumption: '2.488295',
                'Elasticity 3': '2.34',
                'Elasticity 4': '3.08',
                'Elasticity 5': '19.9'
            },
            {
                generation: '0',
                'Final Drive': '1.8815293474575492',
                'Roll Radius': '0.37886372731392953',
                'Gear 3': '1.5944795245352499',
                'Gear 4': '1.2290440328612724',
                'Gear 5': '0.7740577890268023',
                Consumption: '1.058871',
                'Elasticity 3': '61.08',
                'Elasticity 4': '102.83',
                'Elasticity 5': '243.11'
            },
            {
                generation: '0',
                'Final Drive': '4.381529347457549',
                'Roll Radius': '0.4788637273139295',
                'Gear 3': '1.914057789026803',
                'Gear 4': '1.9108622146794543',
                'Gear 5': '1.808765238820964',
                Consumption: '1.529742',
                'Elasticity 3': '12.5',
                'Elasticity 4': '12.54',
                'Elasticity 5': '14.0'
            },
            {
                generation: '0',
                'Final Drive': '2.5065293474575494',
                'Roll Radius': '0.2788637273139295',
                'Gear 3': '1.3801938102495357',
                'Gear 4': '1.0140577890268023',
                'Gear 5': '0.819953123770363',
                Consumption: '1.24232',
                'Elasticity 3': '24.92',
                'Elasticity 4': '46.12',
                'Elasticity 5': '70.51'
            },
            {
                generation: '0',
                'Final Drive': '5.006529347457549',
                'Roll Radius': '0.34553039398059615',
                'Gear 3': '1.6381349419521813',
                'Gear 4': '1.6140577890268029',
                'Gear 5': '0.7373366673923929',
                Consumption: '1.6272',
                'Elasticity 3': '6.76',
                'Elasticity 4': '6.97',
                'Elasticity 5': '33.58'
            },
            {
                generation: '0',
                'Final Drive': '1.2565293474575492',
                'Roll Radius': '0.44553039398059613',
                'Gear 3': '1.3654076692249086',
                'Gear 4': '1.3140577890268028',
                'Gear 5': '1.1659080959638215',
                Consumption: '1.134188',
                'Elasticity 3': '242.47',
                'Elasticity 4': '256.62',
                'Elasticity 5': '300.68'
            },
            {
                generation: '0',
                'Final Drive': '3.7565293474575494',
                'Roll Radius': '0.24553039398059617',
                'Gear 3': '0.9516223816781072',
                'Gear 4': '0.7140577890268024',
                'Gear 5': '0.5472258510430904',
                Consumption: '1.427844',
                'Elasticity 3': '18.09',
                'Elasticity 4': '32.12',
                'Elasticity 5': '54.65'
            }
        ],
        '1': [
            {
                generation: '1',
                'Final Drive': '1.4794630409848657',
                'Roll Radius': '0.23550934544708255',
                'Gear 3': '1.9484417904788294',
                'Gear 4': '1.0725082340764416',
                'Gear 5': '0.6620694726984979',
                Consumption: '1.098317',
                'Elasticity 3': '25.59',
                'Elasticity 4': '84.38',
                'Elasticity 5': '214.61'
            },
            {
                generation: '1',
                'Final Drive': '3.208350824592848',
                'Roll Radius': '0.4081780596120693',
                'Gear 3': '1.6960306555170346',
                'Gear 4': '0.9685218219320872',
                'Gear 5': '0.9223980002829439',
                Consumption: '1.218099',
                'Elasticity 3': '21.58',
                'Elasticity 4': '66.09',
                'Elasticity 5': '72.86'
            },
            {
                generation: '1',
                'Final Drive': '3.8302329617124222',
                'Roll Radius': '0.31574520537684847',
                'Gear 3': '1.40779560248758',
                'Gear 4': '1.3913124231575638',
                'Gear 5': '1.1414467813500702',
                Consumption: '1.53498',
                'Elasticity 3': '13.15',
                'Elasticity 4': '13.46',
                'Elasticity 5': '20.0'
            },
            {
                generation: '1',
                'Final Drive': '2.199495656105409',
                'Roll Radius': '0.27011234997221173',
                'Gear 3': '1.3714769946016014',
                'Gear 4': '0.9474417291165379',
                'Gear 5': '0.8556558186951607',
                Consumption: '1.195177',
                'Elasticity 3': '30.74',
                'Elasticity 4': '64.35',
                'Elasticity 5': '78.89'
            },
            {
                generation: '1',
                'Final Drive': '3.2247316769916905',
                'Roll Radius': '0.41169844074985956',
                'Gear 3': '1.521056351753535',
                'Gear 4': '0.9792500603952867',
                'Gear 5': '0.9618255107305194',
                Consumption: '1.207023',
                'Elasticity 3': '27.01',
                'Elasticity 4': '65.1',
                'Elasticity 5': '67.48'
            },
            {
                generation: '1',
                'Final Drive': '3.8364256664455576',
                'Roll Radius': '0.3477405315208737',
                'Gear 3': '1.4224106467587754',
                'Gear 4': '1.4170753509137466',
                'Gear 5': '1.1650123996311152',
                Consumption: '1.471261',
                'Elasticity 3': '15.57',
                'Elasticity 4': '15.69',
                'Elasticity 5': '23.21'
            },
            {
                generation: '1',
                'Final Drive': '3.6853209006924668',
                'Roll Radius': '0.23936699055415678',
                'Gear 3': '1.0468847754198403',
                'Gear 4': '0.9102268720071964',
                'Gear 5': '0.6748900230836288',
                Consumption: '1.504074',
                'Elasticity 3': '14.76',
                'Elasticity 4': '19.53',
                'Elasticity 5': '35.5'
            },
            {
                generation: '1',
                'Final Drive': '1.7050617331270426',
                'Roll Radius': '0.38503613411032134',
                'Gear 3': '1.0591649723702927',
                'Gear 4': '0.8023752365857397',
                'Gear 5': '0.5742305829156594',
                Consumption: '1.106912',
                'Elasticity 3': '173.61',
                'Elasticity 4': '272.23',
                'Elasticity 5': '392.31'
            },
            {
                generation: '1',
                'Final Drive': '4.069029347457549',
                'Roll Radius': '0.3121970606472628',
                'Gear 3': '1.5017713055885449',
                'Gear 4': '1.3495815653515764',
                'Gear 5': '1.0740577890268022',
                Consumption: '1.582032',
                'Elasticity 3': '10.0',
                'Elasticity 4': '12.39',
                'Elasticity 5': '19.57'
            },
            {
                generation: '1',
                'Final Drive': '1.5690293474575492',
                'Roll Radius': '0.2566415050917073',
                'Gear 3': '1.974057789026803',
                'Gear 4': '0.921010136780148',
                'Gear 5': '0.6835894874067268',
                Consumption: '1.092945',
                'Elasticity 3': '26.32',
                'Elasticity 4': '120.88',
                'Elasticity 5': '212.9'
            }
        ],
        '2': [
            {
                generation: '2',
                'Final Drive': '1.4481212950749218',
                'Roll Radius': '0.2789468458159388',
                'Gear 3': '1.9698707356030263',
                'Gear 4': '0.9849413009199548',
                'Gear 5': '0.6382865792977791',
                Consumption: '1.056405',
                'Elasticity 3': '36.65',
                'Elasticity 4': '146.67',
                'Elasticity 5': '297.9'
            },
            {
                generation: '2',
                'Final Drive': '1.6072203134797158',
                'Roll Radius': '0.22901541819364743',
                'Gear 3': '1.9400370529727242',
                'Gear 4': '0.9987145659171957',
                'Gear 5': '0.6533293695366037',
                Consumption: '1.137947',
                'Elasticity 3': '20.69',
                'Elasticity 4': '77.96',
                'Elasticity 5': '181.07'
            },
            {
                generation: '2',
                'Final Drive': '1.7110811115274065',
                'Roll Radius': '0.4038857478843776',
                'Gear 3': '1.1835871945775858',
                'Gear 4': '0.715514638782166',
                'Gear 5': '0.6862434468827747',
                Consumption: '1.109605',
                'Elasticity 3': '152.53',
                'Elasticity 4': '329.08',
                'Elasticity 5': '343.13'
            },
            {
                generation: '2',
                'Final Drive': '3.2464934804652703',
                'Roll Radius': '0.42685250412635567',
                'Gear 3': '1.4961799741667745',
                'Gear 4': '0.9366430258979321',
                'Gear 5': '0.9296502353371063',
                Consumption: '1.185072',
                'Elasticity 3': '29.61',
                'Elasticity 4': '75.47',
                'Elasticity 5': '76.61'
            },
            {
                generation: '2',
                'Final Drive': '1.7125397534369284',
                'Roll Radius': '0.3984525715919889',
                'Gear 3': '1.077861914631077',
                'Gear 4': '0.7188446386057259',
                'Gear 5': '0.6148300060923343',
                Consumption: '1.11368',
                'Elasticity 3': '177.66',
                'Elasticity 4': '322.65',
                'Elasticity 5': '377.51'
            },
            {
                generation: '2',
                'Final Drive': '1.67417403408827',
                'Roll Radius': '0.37239348593756416',
                'Gear 3': '1.0787500015461595',
                'Gear 4': '0.8940346211872687',
                'Gear 5': '0.8456792888147338',
                Consumption: '1.108925',
                'Elasticity 3': '162.89',
                'Elasticity 4': '226.87',
                'Elasticity 5': '247.18'
            },
            {
                generation: '2',
                'Final Drive': '3.4950448288394997',
                'Roll Radius': '0.3940501352205378',
                'Gear 3': '1.7373835837612979',
                'Gear 4': '1.021935311302747',
                'Gear 5': '0.9882921644867829',
                Consumption: '1.292594',
                'Elasticity 3': '16.15',
                'Elasticity 4': '46.63',
                'Elasticity 5': '49.86'
            },
            {
                generation: '2',
                'Final Drive': '3.8931326009827756',
                'Roll Radius': '0.35172916045133895',
                'Gear 3': '1.4850981401724006',
                'Gear 4': '1.4686365641906618',
                'Gear 5': '1.1497560346623938',
                Consumption: '1.480211',
                'Elasticity 3': '14.19',
                'Elasticity 4': '14.51',
                'Elasticity 5': '23.68'
            },
            {
                generation: '2',
                'Final Drive': '3.208350824592848',
                'Roll Radius': '0.4081780596120693',
                'Gear 3': '1.6960306555170346',
                'Gear 4': '0.9685218219320872',
                'Gear 5': '0.9223980002829439',
                Consumption: '1.218099',
                'Elasticity 3': '21.58',
                'Elasticity 4': '66.09',
                'Elasticity 5': '72.86'
            },
            {
                generation: '2',
                'Final Drive': '1.4794630409848657',
                'Roll Radius': '0.23550934544708255',
                'Gear 3': '1.9484417904788294',
                'Gear 4': '1.0725082340764416',
                'Gear 5': '0.6620694726984979',
                Consumption: '1.098317',
                'Elasticity 3': '25.59',
                'Elasticity 4': '84.38',
                'Elasticity 5': '214.61'
            }
        ],
        '3': [
            {
                generation: '3',
                'Final Drive': '1.709857917289639',
                'Roll Radius': '0.3893933456394441',
                'Gear 3': '0.9949409663913225',
                'Gear 4': '0.8068009259492416',
                'Gear 5': '0.6970687385264152',
                Consumption: '1.109732',
                'Elasticity 3': '197.4',
                'Elasticity 4': '273.32',
                'Elasticity 5': '325.82'
            },
            {
                generation: '3',
                'Final Drive': '1.5418146830534631',
                'Roll Radius': '0.4362374372729935',
                'Gear 3': '1.040011185033848',
                'Gear 4': '0.6403474695333691',
                'Gear 5': '0.5720751456738151',
                Consumption: '1.152418',
                'Elasticity 3': '259.66',
                'Elasticity 4': '440.78',
                'Elasticity 5': '493.39'
            },
            {
                generation: '3',
                'Final Drive': '4.035086205982081',
                'Roll Radius': '0.3655797925355283',
                'Gear 3': '1.5019708320452256',
                'Gear 4': '1.4628626772263493',
                'Gear 5': '1.1443563189195112',
                Consumption: '1.47793',
                'Elasticity 3': '13.95',
                'Elasticity 4': '14.71',
                'Elasticity 5': '24.04'
            },
            {
                generation: '3',
                'Final Drive': '4.021083775298124',
                'Roll Radius': '0.3695155154949794',
                'Gear 3': '1.459551344919665',
                'Gear 4': '1.4263263576648328',
                'Gear 5': '1.1706530796120689',
                Consumption: '1.466454',
                'Elasticity 3': '15.2',
                'Elasticity 4': '15.92',
                'Elasticity 5': '23.63'
            },
            {
                generation: '3',
                'Final Drive': '1.354579224797678',
                'Roll Radius': '0.22237097053681953',
                'Gear 3': '1.8525813403085625',
                'Gear 4': '0.9809216810265644',
                'Gear 5': '0.633613240822517',
                Consumption: '1.07335',
                'Elasticity 3': '30.1',
                'Elasticity 4': '107.31',
                'Elasticity 5': '241.64'
            },
            {
                generation: '3',
                'Final Drive': '1.5169833970113724',
                'Roll Radius': '0.2234218302417497',
                'Gear 3': '1.8882310617055176',
                'Gear 4': '1.1011366905040323',
                'Gear 5': '0.7246213179751032',
                Consumption: '1.146298',
                'Elasticity 3': '23.33',
                'Elasticity 4': '68.52',
                'Elasticity 5': '158.39'
            },
            {
                generation: '3',
                'Final Drive': '1.424010386055874',
                'Roll Radius': '0.398203020789997',
                'Gear 3': '1.9921213289673876',
                'Gear 4': '0.941063266375141',
                'Gear 5': '0.7280841406213489',
                Consumption: '1.089831',
                'Elasticity 3': '75.46',
                'Elasticity 4': '292.26',
                'Elasticity 5': '383.14'
            },
            {
                generation: '3',
                'Final Drive': '1.719130332573239',
                'Roll Radius': '0.2223780448202639',
                'Gear 3': '1.9465965538742125',
                'Gear 4': '0.9704559293376',
                'Gear 5': '0.5634181871965955',
                Consumption: '1.156563',
                'Elasticity 3': '16.93',
                'Elasticity 4': '68.05',
                'Elasticity 5': '198.44'
            },
            {
                generation: '3',
                'Final Drive': '3.793323535086535',
                'Roll Radius': '0.34830766859305196',
                'Gear 3': '1.524848093123341',
                'Gear 4': '1.4424138789287635',
                'Gear 5': '0.7867127986471119',
                Consumption: '1.391933',
                'Elasticity 3': '13.9',
                'Elasticity 4': '15.54',
                'Elasticity 5': '52.18'
            },
            {
                generation: '3',
                'Final Drive': '1.4481212950749218',
                'Roll Radius': '0.2789468458159388',
                'Gear 3': '1.9698707356030263',
                'Gear 4': '0.9849413009199548',
                'Gear 5': '0.6382865792977791',
                Consumption: '1.056405',
                'Elasticity 3': '36.65',
                'Elasticity 4': '146.67',
                'Elasticity 5': '297.9'
            }
        ],
        '4': [
            {
                generation: '4',
                'Final Drive': '1.3373545547551955',
                'Roll Radius': '0.22347301575339362',
                'Gear 3': '1.8708956732232336',
                'Gear 4': '1.0229971593019034',
                'Gear 5': '0.7247783768327256',
                Consumption: '1.08547',
                'Elasticity 3': '30.58',
                'Elasticity 4': '102.22',
                'Elasticity 5': '199.89'
            },
            {
                generation: '4',
                'Final Drive': '1.185937633735704',
                'Roll Radius': '0.4442497988623122',
                'Gear 3': '1.1223464231729576',
                'Gear 4': '0.6282990011089492',
                'Gear 5': '0.587881177659588',
                Consumption: '1.186493',
                'Elasticity 3': '332.96',
                'Elasticity 4': '594.77',
                'Elasticity 5': '635.66'
            },
            {
                generation: '4',
                'Final Drive': '3.9495841449729108',
                'Roll Radius': '0.36671248404305734',
                'Gear 3': '1.5022508352934558',
                'Gear 4': '1.439062123719479',
                'Gear 5': '1.154685950322035',
                Consumption: '1.460154',
                'Elasticity 3': '14.65',
                'Elasticity 4': '15.96',
                'Elasticity 5': '24.79'
            },
            {
                generation: '4',
                'Final Drive': '1.503304645683218',
                'Roll Radius': '0.23170572720020263',
                'Gear 3': '1.9187997635265577',
                'Gear 4': '1.064459960616555',
                'Gear 5': '0.661623763493519',
                Consumption: '1.107816',
                'Elasticity 3': '24.74',
                'Elasticity 4': '80.3',
                'Elasticity 5': '203.5'
            },
            {
                generation: '4',
                'Final Drive': '1.3714791361870864',
                'Roll Radius': '0.29437504434927797',
                'Gear 3': '1.9337523938029435',
                'Gear 4': '0.9876944843495387',
                'Gear 5': '0.7789943532834175',
                Consumption: '1.063851',
                'Elasticity 3': '47.2',
                'Elasticity 4': '179.87',
                'Elasticity 5': '264.37'
            },
            {
                generation: '4',
                'Final Drive': '1.7200773993957537',
                'Roll Radius': '0.23470328889979886',
                'Gear 3': '1.8901859022995178',
                'Gear 4': '1.1497214931001525',
                'Gear 5': '0.7022443296476185',
                Consumption: '1.179003',
                'Elasticity 3': '19.98',
                'Elasticity 4': '53.95',
                'Elasticity 5': '144.77'
            },
            {
                generation: '4',
                'Final Drive': '3.837819446764085',
                'Roll Radius': '0.3574089299566585',
                'Gear 3': '1.526755776824344',
                'Gear 4': '1.4352341237815827',
                'Gear 5': '0.5466421676172597',
                Consumption: '1.338242',
                'Elasticity 3': '14.27',
                'Elasticity 4': '16.14',
                'Elasticity 5': '111.21'
            },
            {
                generation: '4',
                'Final Drive': '1.6414852414011594',
                'Roll Radius': '0.2031577506089446',
                'Gear 3': '1.5036032752298438',
                'Gear 4': '1.4919774810757715',
                'Gear 5': '1.146422595619363',
                Consumption: '1.277573',
                'Elasticity 3': '25.98',
                'Elasticity 4': '26.38',
                'Elasticity 5': '44.66'
            },
            {
                generation: '4',
                'Final Drive': '2.487850295077947',
                'Roll Radius': '0.2873573197786146',
                'Gear 3': '1.4113642104560744',
                'Gear 4': '1.001357894970024',
                'Gear 5': '0.7591068483445307',
                Consumption: '1.217716',
                'Elasticity 3': '25.68',
                'Elasticity 4': '50.97',
                'Elasticity 5': '88.68'
            },
            {
                generation: '4',
                'Final Drive': '1.5690293474575492',
                'Roll Radius': '0.2566415050917073',
                'Gear 3': '1.974057789026803',
                'Gear 4': '0.921010136780148',
                'Gear 5': '0.6835894874067268',
                Consumption: '1.092945',
                'Elasticity 3': '26.32',
                'Elasticity 4': '120.88',
                'Elasticity 5': '212.9'
            }
        ],
        '5': [
            {
                generation: '5',
                'Final Drive': '1.5382387582926031',
                'Roll Radius': '0.2121379300348883',
                'Gear 3': '1.698106100775671',
                'Gear 4': '0.931648744922366',
                'Gear 5': '0.7604280041272329',
                Consumption: '1.15605',
                'Elasticity 3': '25.29',
                'Elasticity 4': '83.93',
                'Elasticity 5': '126.07'
            },
            {
                generation: '5',
                'Final Drive': '3.8455744709546176',
                'Roll Radius': '0.3734062079086226',
                'Gear 3': '1.4905800475949142',
                'Gear 4': '1.4742830764064903',
                'Gear 5': '0.5827463999505991',
                Consumption: '1.321287',
                'Elasticity 3': '16.27',
                'Elasticity 4': '16.63',
                'Elasticity 5': '106.37'
            },
            {
                generation: '5',
                'Final Drive': '4.1498603823960405',
                'Roll Radius': '0.3430357094842419',
                'Gear 3': '1.5871900078262136',
                'Gear 4': '1.4536269836246998',
                'Gear 5': '0.5640504714536371',
                Consumption: '1.424186',
                'Elasticity 3': '10.4',
                'Elasticity 4': '12.4',
                'Elasticity 5': '82.26'
            },
            {
                generation: '5',
                'Final Drive': '3.828067604205786',
                'Roll Radius': '0.35735369086429636',
                'Gear 3': '1.472658022648417',
                'Gear 4': '1.3632762052118619',
                'Gear 5': '1.1363706973713887',
                Consumption: '1.443567',
                'Elasticity 3': '15.41',
                'Elasticity 4': '17.98',
                'Elasticity 5': '25.88'
            },
            {
                generation: '5',
                'Final Drive': '4.2578072792222965',
                'Roll Radius': '0.3530912229099137',
                'Gear 3': '1.4974583748762058',
                'Gear 4': '1.4243747345550684',
                'Gear 5': '0.7296277420900058',
                Consumption: '1.443474',
                'Elasticity 3': '11.76',
                'Elasticity 4': '13.0',
                'Elasticity 5': '49.49'
            },
            {
                generation: '5',
                'Final Drive': '1.6842965546854405',
                'Roll Radius': '0.2395733794629859',
                'Gear 3': '1.8325693241262742',
                'Gear 4': '1.034196534851508',
                'Gear 5': '0.8009470152199807',
                Consumption: '1.16819',
                'Elasticity 3': '23.1',
                'Elasticity 4': '72.45',
                'Elasticity 5': '120.87'
            },
            {
                generation: '5',
                'Final Drive': '2.228554634220223',
                'Roll Radius': '0.2718101890859935',
                'Gear 3': '1.4469521569535526',
                'Gear 4': '0.994183550525879',
                'Gear 5': '0.6929991557493729',
                Consumption: '1.182732',
                'Elasticity 3': '27.24',
                'Elasticity 4': '57.65',
                'Elasticity 5': '118.71'
            },
            {
                generation: '5',
                'Final Drive': '2.3881616979732425',
                'Roll Radius': '0.2818501594892588',
                'Gear 3': '1.3889933771762935',
                'Gear 4': '0.948978939011541',
                'Gear 5': '0.7411174849908986',
                Consumption: '1.198481',
                'Elasticity 3': '27.68',
                'Elasticity 4': '59.24',
                'Elasticity 5': '97.14'
            },
            {
                generation: '5',
                'Final Drive': '2.7281238021610505',
                'Roll Radius': '0.403009794464285',
                'Gear 3': '1.5064003050480455',
                'Gear 4': '1.1615580336463986',
                'Gear 5': '1.0164272321907908',
                Consumption: '1.167501',
                'Elasticity 3': '36.86',
                'Elasticity 4': '61.95',
                'Elasticity 5': '80.9'
            },
            {
                generation: '5',
                'Final Drive': '1.3373545547551955',
                'Roll Radius': '0.22347301575339362',
                'Gear 3': '1.8708956732232336',
                'Gear 4': '1.0229971593019034',
                'Gear 5': '0.7247783768327256',
                Consumption: '1.08547',
                'Elasticity 3': '30.58',
                'Elasticity 4': '102.22',
                'Elasticity 5': '199.89'
            }
        ],
        '6': [
            {
                generation: '6',
                'Final Drive': '1.3258532110622632',
                'Roll Radius': '0.3583157375776931',
                'Gear 3': '1.654720088254317',
                'Gear 4': '1.420880024737752',
                'Gear 5': '0.5694859208372517',
                Consumption: '1.079704',
                'Elasticity 3': '102.19',
                'Elasticity 4': '138.7',
                'Elasticity 5': '473.41'
            },
            {
                generation: '6',
                'Final Drive': '1.358768966381719',
                'Roll Radius': '0.22910264015604465',
                'Gear 3': '1.6868307656664638',
                'Gear 4': '1.0273552080387551',
                'Gear 5': '0.5849618200125394',
                Consumption: '1.050983',
                'Elasticity 3': '38.29',
                'Elasticity 4': '103.19',
                'Elasticity 5': '281.07'
            },
            {
                generation: '6',
                'Final Drive': '2.4147054196638553',
                'Roll Radius': '0.4071806373399903',
                'Gear 3': '1.5709341771322007',
                'Gear 4': '1.2466036655508517',
                'Gear 5': '1.1402153846288738',
                Consumption: '1.150827',
                'Elasticity 3': '44.15',
                'Elasticity 4': '70.08',
                'Elasticity 5': '83.77'
            },
            {
                generation: '6',
                'Final Drive': '3.510436943328198',
                'Roll Radius': '0.3516651413035581',
                'Gear 3': '1.4865850756886554',
                'Gear 4': '1.3294877419081361',
                'Gear 5': '0.9253070572820264',
                Consumption: '1.350921',
                'Elasticity 3': '17.41',
                'Elasticity 4': '21.77',
                'Elasticity 5': '44.91'
            },
            {
                generation: '6',
                'Final Drive': '1.2210645694218756',
                'Roll Radius': '0.24765132821162672',
                'Gear 3': '1.8269117345027015',
                'Gear 4': '0.9726126437698381',
                'Gear 5': '0.74860553338207',
                Consumption: '1.062465',
                'Elasticity 3': '47.22',
                'Elasticity 4': '166.46',
                'Elasticity 5': '258.12'
            },
            {
                generation: '6',
                'Final Drive': '1.3600289813253914',
                'Roll Radius': '0.24611145922680105',
                'Gear 3': '1.8367916644264586',
                'Gear 4': '1.0824592769709058',
                'Gear 5': '0.5631489544303534',
                Consumption: '1.04696',
                'Elasticity 3': '37.2',
                'Elasticity 4': '107.08',
                'Elasticity 5': '320.17'
            },
            {
                generation: '6',
                'Final Drive': '4.073111740670135',
                'Roll Radius': '0.3903645349459818',
                'Gear 3': '1.5049014453949177',
                'Gear 4': '1.4767750641809205',
                'Gear 5': '0.6793664717181329',
                Consumption: '1.348499',
                'Elasticity 3': '15.55',
                'Elasticity 4': '16.15',
                'Elasticity 5': '76.22'
            },
            {
                generation: '6',
                'Final Drive': '2.299964753776844',
                'Roll Radius': '0.38315554429523857',
                'Gear 3': '1.5735191383433331',
                'Gear 4': '1.4522889157099481',
                'Gear 5': '0.6290347100960149',
                Consumption: '1.079204',
                'Elasticity 3': '42.95',
                'Elasticity 4': '50.41',
                'Elasticity 5': '249.71'
            },
            {
                generation: '6',
                'Final Drive': '3.8931326009827756',
                'Roll Radius': '0.35172916045133895',
                'Gear 3': '1.4850981401724006',
                'Gear 4': '1.4686365641906618',
                'Gear 5': '1.1497560346623938',
                Consumption: '1.480211',
                'Elasticity 3': '14.19',
                'Elasticity 4': '14.51',
                'Elasticity 5': '23.68'
            },
            {
                generation: '6',
                'Final Drive': '1.5382387582926031',
                'Roll Radius': '0.2121379300348883',
                'Gear 3': '1.698106100775671',
                'Gear 4': '0.931648744922366',
                'Gear 5': '0.7604280041272329',
                Consumption: '1.15605',
                'Elasticity 3': '25.29',
                'Elasticity 4': '83.93',
                'Elasticity 5': '126.07'
            }
        ],
        '7': [
            {
                generation: '7',
                'Final Drive': '1.5871852870428715',
                'Roll Radius': '0.20532550686152817',
                'Gear 3': '1.6807554669315474',
                'Gear 4': '0.8910369231739577',
                'Gear 5': '0.7570288107383771',
                Consumption: '1.179759',
                'Elasticity 3': '22.72',
                'Elasticity 4': '80.73',
                'Elasticity 5': '111.89'
            },
            {
                generation: '7',
                'Final Drive': '1.5810893757674986',
                'Roll Radius': '0.20091173712809937',
                'Gear 3': '1.6406658085246815',
                'Gear 4': '0.9690095665987803',
                'Gear 5': '0.7452642555193841',
                Consumption: '1.18874',
                'Elasticity 3': '23.0',
                'Elasticity 4': '65.86',
                'Elasticity 5': '111.39'
            },
            {
                generation: '7',
                'Final Drive': '4.184306743495775',
                'Roll Radius': '0.33352290819675967',
                'Gear 3': '1.521341848189845',
                'Gear 4': '1.3714257571850506',
                'Gear 5': '1.2021250169276414',
                Consumption: '1.585215',
                'Elasticity 3': '10.52',
                'Elasticity 4': '12.95',
                'Elasticity 5': '16.86'
            },
            {
                generation: '7',
                'Final Drive': '1.0841573017770545',
                'Roll Radius': '0.23981047646725895',
                'Gear 3': '1.763023442459217',
                'Gear 4': '1.1795909115916974',
                'Gear 5': '0.5559205912799257',
                Consumption: '1.052707',
                'Elasticity 3': '60.29',
                'Elasticity 4': '134.8',
                'Elasticity 5': '396.93'
            },
            {
                generation: '7',
                'Final Drive': '1.387768874987408',
                'Roll Radius': '0.22285544781745936',
                'Gear 3': '1.6795732636627094',
                'Gear 4': '0.9269805435928709',
                'Gear 5': '0.9211725153930131',
                Consumption: '1.127752',
                'Elasticity 3': '35.04',
                'Elasticity 4': '115.0',
                'Elasticity 5': '116.46'
            },
            {
                generation: '7',
                'Final Drive': '1.3335063828188116',
                'Roll Radius': '0.21876207552795443',
                'Gear 3': '1.693895241798542',
                'Gear 4': '0.9508439783593001',
                'Gear 5': '0.8419677218704147',
                Consumption: '1.109311',
                'Elasticity 3': '35.95',
                'Elasticity 4': '114.06',
                'Elasticity 5': '145.57'
            },
            {
                generation: '7',
                'Final Drive': '1.5899214917801507',
                'Roll Radius': '0.2057918743686107',
                'Gear 3': '1.7288362610043533',
                'Gear 4': '1.3597037035753279',
                'Gear 5': '0.6992163451660212',
                Consumption: '1.203024',
                'Elasticity 3': '21.49',
                'Elasticity 4': '34.73',
                'Elasticity 5': '131.36'
            },
            {
                generation: '7',
                'Final Drive': '1.5117990222770974',
                'Roll Radius': '0.22292668506895114',
                'Gear 3': '1.6202852722602006',
                'Gear 4': '1.4446318264438531',
                'Gear 5': '0.7974439614652581',
                Consumption: '1.159939',
                'Elasticity 3': '31.75',
                'Elasticity 4': '39.93',
                'Elasticity 5': '131.07'
            },
            {
                generation: '7',
                'Final Drive': '3.208350824592848',
                'Roll Radius': '0.4081780596120693',
                'Gear 3': '1.6960306555170346',
                'Gear 4': '0.9685218219320872',
                'Gear 5': '0.9223980002829439',
                Consumption: '1.218099',
                'Elasticity 3': '21.58',
                'Elasticity 4': '66.09',
                'Elasticity 5': '72.86'
            },
            {
                generation: '7',
                'Final Drive': '5.502059642082483',
                'Roll Radius': '0.48270564660917153',
                'Gear 3': '1.9350254789459265',
                'Gear 4': '1.0665908363914391',
                'Gear 5': '0.539052973405078',
                Consumption: '1.379475',
                'Elasticity 3': '7.88',
                'Elasticity 4': '25.94',
                'Elasticity 5': '101.48'
            }
        ],
        '8': [
            {
                generation: '8',
                'Final Drive': '1.6487930750063668',
                'Roll Radius': '0.23026742303646577',
                'Gear 3': '1.6937175579770483',
                'Gear 4': '0.908158314370114',
                'Gear 5': '0.7605757148502321',
                Consumption: '1.148334',
                'Elasticity 3': '26.07',
                'Elasticity 4': '90.58',
                'Elasticity 5': '129.24'
            },
            {
                generation: '8',
                'Final Drive': '3.5819105627623955',
                'Roll Radius': '0.42220396816822753',
                'Gear 3': '1.6902587743273128',
                'Gear 4': '0.9902538372826744',
                'Gear 5': '0.9740949738804567',
                Consumption: '1.261906',
                'Elasticity 3': '18.65',
                'Elasticity 4': '54.27',
                'Elasticity 5': '56.09'
            },
            {
                generation: '8',
                'Final Drive': '1.8254055197330068',
                'Roll Radius': '0.21232528827375524',
                'Gear 3': '1.6549996321154503',
                'Gear 4': '0.9653667270710659',
                'Gear 5': '0.6934006010925586',
                Consumption: '1.222702',
                'Elasticity 3': '18.94',
                'Elasticity 4': '55.61',
                'Elasticity 5': '107.81'
            },
            {
                generation: '8',
                'Final Drive': '1.66602939393514',
                'Roll Radius': '0.2192120462885423',
                'Gear 3': '1.75706846627086',
                'Gear 4': '1.3185193961367319',
                'Gear 5': '0.6657024271959882',
                Consumption: '1.187303',
                'Elasticity 3': '21.5',
                'Elasticity 4': '38.17',
                'Elasticity 5': '149.82'
            },
            {
                generation: '8',
                'Final Drive': '1.7782140722137074',
                'Roll Radius': '0.2066307720176141',
                'Gear 3': '1.6461241203955466',
                'Gear 4': '0.8957503208167177',
                'Gear 5': '0.7273780022258365',
                Consumption: '1.223189',
                'Elasticity 3': '19.11',
                'Elasticity 4': '64.45',
                'Elasticity 5': '97.77'
            },
            {
                generation: '8',
                'Final Drive': '2.9632000216170473',
                'Roll Radius': '0.4067189498230017',
                'Gear 3': '1.7099035887841216',
                'Gear 4': '0.9368080823235135',
                'Gear 5': '0.925897625881297',
                Consumption: '1.184646',
                'Elasticity 3': '24.71',
                'Elasticity 4': '82.22',
                'Elasticity 5': '84.17'
            },
            {
                generation: '8',
                'Final Drive': '5.690283550819013',
                'Roll Radius': '0.48375111321758396',
                'Gear 3': '1.9900272706355526',
                'Gear 4': '0.9995816829864612',
                'Gear 5': '0.536387369148561',
                Consumption: '1.399229',
                'Elasticity 3': '6.96',
                'Elasticity 4': '27.73',
                'Elasticity 5': '96.23'
            },
            {
                generation: '8',
                'Final Drive': '3.977143670974587',
                'Roll Radius': '0.3434452219990296',
                'Gear 3': '1.4560158535158125',
                'Gear 4': '1.3672212304892857',
                'Gear 5': '1.129739709967963',
                Consumption: '1.498717',
                'Elasticity 3': '13.49',
                'Elasticity 4': '15.3',
                'Elasticity 5': '22.4'
            },
            {
                generation: '8',
                'Final Drive': '1.5169833970113724',
                'Roll Radius': '0.2234218302417497',
                'Gear 3': '1.8882310617055176',
                'Gear 4': '1.1011366905040323',
                'Gear 5': '0.7246213179751032',
                Consumption: '1.146298',
                'Elasticity 3': '23.33',
                'Elasticity 4': '68.52',
                'Elasticity 5': '158.39'
            },
            {
                generation: '8',
                'Final Drive': '1.5871852870428715',
                'Roll Radius': '0.20532550686152817',
                'Gear 3': '1.6807554669315474',
                'Gear 4': '0.8910369231739577',
                'Gear 5': '0.7570288107383771',
                Consumption: '1.179759',
                'Elasticity 3': '22.72',
                'Elasticity 4': '80.73',
                'Elasticity 5': '111.89'
            }
        ],
        '9': [
            {
                generation: '9',
                'Final Drive': '2.0259559763988726',
                'Roll Radius': '0.20386025947526135',
                'Gear 3': '1.6552460264956823',
                'Gear 4': '0.8648913572695074',
                'Gear 5': '0.7394928115081891',
                Consumption: '1.296088',
                'Elasticity 3': '14.17',
                'Elasticity 4': '51.85',
                'Elasticity 5': '70.91'
            },
            {
                generation: '9',
                'Final Drive': '1.5185770469750013',
                'Roll Radius': '0.2177494788859086',
                'Gear 3': '1.6755188976475255',
                'Gear 4': '0.851266216605696',
                'Gear 5': '0.7702076863870342',
                Consumption: '1.136577',
                'Elasticity 3': '28.08',
                'Elasticity 4': '108.71',
                'Elasticity 5': '132.87'
            },
            {
                generation: '9',
                'Final Drive': '1.7485024434256051',
                'Roll Radius': '0.20718566853483675',
                'Gear 3': '1.6194901095837082',
                'Gear 4': '0.9300000969277162',
                'Gear 5': '0.6642717126602096',
                Consumption: '1.201951',
                'Elasticity 3': '20.53',
                'Elasticity 4': '62.18',
                'Elasticity 5': '121.95'
            },
            {
                generation: '9',
                'Final Drive': '3.6696872171404804',
                'Roll Radius': '0.4167711182940712',
                'Gear 3': '1.694222517165137',
                'Gear 4': '0.9584235501519922',
                'Gear 5': '0.934082931175421',
                Consumption: '1.272856',
                'Elasticity 3': '17.23',
                'Elasticity 4': '53.79',
                'Elasticity 5': '56.62'
            },
            {
                generation: '9',
                'Final Drive': '1.575222182425842',
                'Roll Radius': '0.21806081369627692',
                'Gear 3': '1.7370604392036164',
                'Gear 4': '1.2227474998782621',
                'Gear 5': '0.640240705379915',
                Consumption: '1.147332',
                'Elasticity 3': '24.35',
                'Elasticity 4': '49.1',
                'Elasticity 5': '178.2'
            },
            {
                generation: '9',
                'Final Drive': '1.7464661005552204',
                'Roll Radius': '0.24639971521726045',
                'Gear 3': '1.7015298613250034',
                'Gear 4': '0.8835500232262479',
                'Gear 5': '0.7678467964436332',
                Consumption: '1.144647',
                'Elasticity 3': '26.36',
                'Elasticity 4': '97.67',
                'Elasticity 5': '129.41'
            },
            {
                generation: '9',
                'Final Drive': '3.4967348051121263',
                'Roll Radius': '0.41769091170249284',
                'Gear 3': '1.6824510305615543',
                'Gear 4': '1.0029829472522314',
                'Gear 5': '0.9427930584727335',
                Consumption: '1.25131',
                'Elasticity 3': '19.33',
                'Elasticity 4': '54.33',
                'Elasticity 5': '61.48'
            },
            {
                generation: '9',
                'Final Drive': '1.591570927163911',
                'Roll Radius': '0.22815946515454053',
                'Gear 3': '1.9349818255354259',
                'Gear 4': '1.1272694237400231',
                'Gear 5': '0.7331074453648642',
                Consumption: '1.1653',
                'Elasticity 3': '21.05',
                'Elasticity 4': '61.94',
                'Elasticity 5': '146.63'
            },
            {
                generation: '9',
                'Final Drive': '1.5690293474575492',
                'Roll Radius': '0.2566415050917073',
                'Gear 3': '1.974057789026803',
                'Gear 4': '0.921010136780148',
                'Gear 5': '0.6835894874067268',
                Consumption: '1.092945',
                'Elasticity 3': '26.32',
                'Elasticity 4': '120.88',
                'Elasticity 5': '212.9'
            },
            {
                generation: '9',
                'Final Drive': '1.6487930750063668',
                'Roll Radius': '0.23026742303646577',
                'Gear 3': '1.6937175579770483',
                'Gear 4': '0.908158314370114',
                'Gear 5': '0.7605757148502321',
                Consumption: '1.148334',
                'Elasticity 3': '26.07',
                'Elasticity 4': '90.58',
                'Elasticity 5': '129.24'
            }
        ],
        '10': [
            {
                generation: '10',
                'Final Drive': '1.5828346188508617',
                'Roll Radius': '0.23434322908531457',
                'Gear 3': '1.905067493772779',
                'Gear 4': '1.187971357328183',
                'Gear 5': '0.746551742859562',
                Consumption: '1.155599',
                'Elasticity 3': '23.16',
                'Elasticity 4': '59.49',
                'Elasticity 5': '150.83'
            },
            {
                generation: '10',
                'Final Drive': '1.6664552437514735',
                'Roll Radius': '0.21277808328607342',
                'Gear 3': '1.7721521335173356',
                'Gear 4': '1.3000074935280792',
                'Gear 5': '0.6257680964727362',
                Consumption: '1.192115',
                'Elasticity 3': '19.91',
                'Elasticity 4': '36.97',
                'Elasticity 5': '159.6'
            },
            {
                generation: '10',
                'Final Drive': '1.8197917290998855',
                'Roll Radius': '0.22112870547214578',
                'Gear 3': '1.6995650327874596',
                'Gear 4': '0.9420732152916922',
                'Gear 5': '0.7349384527391809',
                Consumption: '1.210936',
                'Elasticity 3': '19.6',
                'Elasticity 4': '63.72',
                'Elasticity 5': '104.73'
            },
            {
                generation: '10',
                'Final Drive': '1.8679756122267586',
                'Roll Radius': '0.20406711197034497',
                'Gear 3': '1.663768314718081',
                'Gear 4': '0.9885952487684555',
                'Gear 5': '0.7752223490309833',
                Consumption: '1.269235',
                'Elasticity 3': '16.53',
                'Elasticity 4': '46.79',
                'Elasticity 5': '76.06'
            },
            {
                generation: '10',
                'Final Drive': '1.489040965661516',
                'Roll Radius': '0.2692705821755931',
                'Gear 3': '1.9552048550245749',
                'Gear 4': '0.9311084367456965',
                'Gear 5': '0.722635263233055',
                Consumption: '1.077605',
                'Elasticity 3': '32.79',
                'Elasticity 4': '144.64',
                'Elasticity 5': '228.96'
            },
            {
                generation: '10',
                'Final Drive': '1.6072979040661268',
                'Roll Radius': '0.21844814597530732',
                'Gear 3': '1.7932660076568379',
                'Gear 4': '1.2474382027753212',
                'Gear 5': '0.7143409841841704',
                Consumption: '1.181841',
                'Elasticity 3': '22.03',
                'Elasticity 4': '45.48',
                'Elasticity 5': '138.79'
            },
            {
                generation: '10',
                'Final Drive': '1.8183189745453943',
                'Roll Radius': '0.2504627829134454',
                'Gear 3': '1.9971986155932941',
                'Gear 4': '0.8601492892785867',
                'Gear 5': '0.7168897701889216',
                Consumption: '1.165435',
                'Elasticity 3': '18.24',
                'Elasticity 4': '98.24',
                'Elasticity 5': '141.55'
            },
            {
                generation: '10',
                'Final Drive': '1.5617256326084055',
                'Roll Radius': '0.26380905025890244',
                'Gear 3': '1.9750995994143867',
                'Gear 4': '0.954162945645623',
                'Gear 5': '0.6748417254146974',
                Consumption: '1.082839',
                'Elasticity 3': '28.05',
                'Elasticity 4': '120.11',
                'Elasticity 5': '229.06'
            },
            {
                generation: '10',
                'Final Drive': '1.4481212950749218',
                'Roll Radius': '0.2789468458159388',
                'Gear 3': '1.9698707356030263',
                'Gear 4': '0.9849413009199548',
                'Gear 5': '0.6382865792977791',
                Consumption: '1.056405',
                'Elasticity 3': '36.65',
                'Elasticity 4': '146.67',
                'Elasticity 5': '297.9'
            },
            {
                generation: '10',
                'Final Drive': '2.0259559763988726',
                'Roll Radius': '0.20386025947526135',
                'Gear 3': '1.6552460264956823',
                'Gear 4': '0.8648913572695074',
                'Gear 5': '0.7394928115081891',
                Consumption: '1.296088',
                'Elasticity 3': '14.17',
                'Elasticity 4': '51.85',
                'Elasticity 5': '70.91'
            }
        ]
    }

    const generation = "0"

    type ObjectKey = keyof typeof testList;
    let list: { gear3: string, ela3: string }[] = [];

    for (var i = 0; i < Object.keys(testList).length; i++) {

        const generationIndex = i.toString() as ObjectKey;

        if (generationIndex == generation) {
            for (var j = 0; j < testList[generationIndex].length; j++) {

                const g3 = testList[generationIndex][j]['Gear 3']
                const e3 = testList[generationIndex][j]['Elasticity 3']

                list.push({ gear3: g3, ela3: e3 })
            }
        }
    }

    const ctx = document.getElementById("my_graph_gen") as HTMLCanvasElement;
    if (!ctx) return;

    new Chart(
        // @ts-ignore
        ctx,
        {
            type: 'scatter',
            data: {
                labels: list.map(row => row.gear3),
                datasets: [
                    {
                        label: 'Gear -> Ela',
                        data: list.map(row => row.ela3),
                        borderColor: 'rgb(255, 0, 221)',
                    }
                ]
            }
        }
    );
};

export default graphGen;