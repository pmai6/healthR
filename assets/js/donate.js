window.onload = start;

// This is where all of our javascript code resides. This method
// is called by "window" when the document (everything you see on
// the screen) has finished loading.
function start() {
    // Select the color for filtering
    var graph = document.getElementById('graph');
    //var textBox = document.getElementById('textbox1').value;

    // Specify the width and height of our graph
    // as variables so we can use them later.
    // Remember, hardcoding sucks! :)
    var width = 500;
    var height = 300;

    // Here we tell D3 to select the graph that we defined above.
    // Then, we add an <svg></svg> tag inside the graph.
    // On the <svg> element, we set the width and height.
    // Then, we save the reference to this element in the "svg" variable,
    // so we can use it later.
    // 
    // So our code now looks like this in the browser:
    // <svg width="700" height="600">
    // </svg>
    var svg = d3.select(graph)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    var bars = svg.append('g');

    var xScale = d3.scale.linear().range([0, width]);
    var yScale = d3.scale.ordinal().rangeRoundBands([0, height], 0.3);

    // Tell D3 to create a y-axis scale for us, and orient it to the left.
    // That means the labels are on the left, and tick marks on the right.
    var yAxis = d3.svg.axis().scale(yScale).orient('left');

    var select = d3.select('body')
        .append('select')
        .attr('class','select')
        .on('change',onchange)

    var options = select
        .selectAll('option')
        .data(color).enter()
        .append('option')
        .text(function (d) { return d; });

    function onchange() {
        selectValue = d3.select('select').property('value')
        //selectNum = d3.select('number').property('value')
        d3.select('body')
        .append('p')
        .text(selectValue + ' is the last selected option.')
    };

    function check() {
          document.getElementById('Donate').value='new value here'
     };

   

    d3.select(graph)
        .append('p')
        .on('click', function() {
            value = document.getElementById('Donate').value;
            
            bars.selectAll('.bar')
                .filter(function(d) {
                    return d.donation >= value;
                })
                .transition()
                .duration(function(d) {
                    return Math.random() * 1000;
                })
                .delay(function(d) {
                    return d.donation * 8000;
                })
                .style("fill",selectColor);// function(d) {

            bars.selectAll('.bar')
                .filter(function(d) {
                    return d.frequency < value;
                })
                .transition()
                .duration(function(d) {
                    return Math.random() * 1000;
                })
                .delay(function(d) {
                    return d.frequency * 8000;
                })
                .attr("opacity", 0.0);

                    
                    // console.log("value is: ", textBox);
                    // //console.log("yes ", d.frequency);
                    // if (d.frequency >= textBox){
                    //     console.log("yes ", d.frequency);
                    //     if (selectColor == "Red"){
                    //         return "rgb(255,0,0)";
                    //     } else if (selectColor == "Green"){
                    //         return "rgb(0,255,0)";
                    //     } else {
                    //         return "rgb(0,0,0)";
                    //     }

                    // } else {
                    //     console.log("NO ", d.frequency);
                    //     return "rgb(255,255,255)";
                    //     //svg.select("bar").attr("opacity", 0.2);
                    //     //bar.attr("visibility", "hidden");
                    //     //     //return (d.frequency < textBox) ? "visible" : "hidden";
                    //     //     bar.attr("visibility", "hidden");
                    //     //     //d.frequency.style.display= "none";
                    //     // d3.selectAll("bar").filter(function(d) { return d.frequency < textBox; })
                    //     //     bars.attr("visibility", "hidden");
                    //     //});
                        
                    //}
                //});
                // .attr('width', function(d) {
                //     return xScale(d.frequency) / 2;
                // });
        });

    // D3 will grab all the data from "data.csv" and make it available
    // to us in a callback function. It follows the form:
    // 
    // d3.csv('file_name.csv', accumulator, callback)
    // 
    // Where 'file_name.csv' - the name of the file to read
    // accumulator - a method with parameter d that lets you pre-process
    //               each row in the CSV. This affects the array of
    //               rows in the function named 'callback'
    //
    // callback - a method with parameters error, data. Error contains
    //            an error message if the data could not be found, or
    //            was malformed. The 'data' parameter is an array of
    //            rows returned after being processed by the accumulator.
    d3.csv('affirmative_asylum.csv', function(d) {
        d.donation = +d.donation;
        return d;
    }, function(error, data) {
        // We now have the "massaged" CSV data in the 'data' variable.
        
        // We set the domain of the xScale. The domain includes 0 up to
        // the maximum frequency in the dataset. This is because 
        xScale.domain([0, d3.max(data, function(d) {
            return d.donation;
        })]);

        // We set the domain of the yScale. The scale is ordinal, and
        // contains every letter in the alphabet (the letter attribute
        // in our data array). We can use the map function to iterate
        // through each value in our data array, and make a new array
        // that contains just letters.
        yScale.domain(data.map(function(d) {
            return d.country;
        }));

        // Append the y-axis to the graph. the translate(20, 0) stuff
        // shifts the axis 20 pixels from the left. This just helps us
        // position stuff to where we want it to be.
      
     
    });
}
