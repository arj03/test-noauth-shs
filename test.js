var pull = require('pull-stream')

var noAuth = {
  remote: 'net:localhost:8009~noauth:KZKou3DnZZxZBkzMCaO3DuMv3UCnK3q8zlgvSvu+nBU='
  ,manifest: {
    createHistoryStream: 'source'
  }
}

function runShs()
{
  require('ssb-client')(function (err, rpc) {
    console.log("sbot 08 got rpc")
    if(err) throw err

    console.log('shs')
    console.time('t')
    var total = 0
    
    pull(
      rpc.createHistoryStream({id: '@6CAxOI3f+LUOVrbAl0IemqiS7ATpQvr9Mdw9LC4+Uv0=.ed25519',
                               seq: 0, keys: false}),
      pull.drain(function (msg) {
        total += 1
        //console.log(msg)
      }, function() {
        console.log(total)
        console.timeEnd('t')
      })
    )
  })
}

require('ssb-client')(noAuth, function (err, rpc) {
  console.log("sbot 08 got rpc")
  if(err) throw err

  console.log('noAuth')
  console.time('t')
  var total = 0
  
  pull(
    rpc.createHistoryStream({id: '@6CAxOI3f+LUOVrbAl0IemqiS7ATpQvr9Mdw9LC4+Uv0=.ed25519',
                             seq: 0, keys: false}),
    pull.drain(function (msg) {
      total += 1
      //console.log(msg)
    }, function() {
      console.log(total)
      console.timeEnd('t')
      runShs()
    })
  )
})

