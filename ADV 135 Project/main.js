HEIGHT = 500
WIDTH = 500

data = []
miniData = []
objDetect = ''
detectObj = 'No'

function modelLoaded(){console.log('Model Intact')}

function setup(){
    canvas = createCanvas(WIDTH, HEIGHT)
    canvas.center('horizontal')
    
    video = createCapture(VIDEO)
    video.hide()
}

function start(){
    cocossd = ml5.objectDetector('cocossd', modelLoaded)
    cocossd.detect(video, gotResult)
    
    objDetect = document.getElementById('objDetect').value
}

function gotResult(error, results){
    if (objDetect != ''){
        if (error){
            console.log(error)
        } 
        console.log(results)
        data = results
    }
}

function draw(){
    image(video, 0, 0, WIDTH, HEIGHT)
    
    if (objDetect != ''){
        detectObj = 'No'
        for (i = 0; i < data.length; i++){
            x = data[i].x - 60
            y = data[i].y
            w = data[i].width
            h = data[i].height * 0.9
            c = data[i].confidence
            l = data[i].label
            
            stroke('#3333bb')
            noFill()
           
            if (l == objDetect){
                detectObj = 'Yes'
            }

            rect(x, y, w, h)
            text(l + ' (' + (floor(c * 100)) + '%)', x + 15, y + 20)
        }

        document.getElementById('objNum').innerText = data.length
        document.getElementById('detectObj').innerText = detectObj
    }

}