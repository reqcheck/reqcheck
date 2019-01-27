<template id="mytmp">
    <div>
        <div id="mynetwork" style="height:500px;"></div>
        <strong id="details">Hover over a course to see more!</strong>
    </div>
</template>

<script>

import * as vis from "vis";
import * as data from '@/assets/sampledata.json'

export default {
    name: 'GraphInset',
    props: {
        courses: Array
    },
        data() {    
        return {
            graph_nodes: new vis.DataSet([]),
            graph_edges: new vis.DataSet([]),
            hovered_course: "",
            options: {
                interaction: {
                    hover:true
                },
                manipulation: {
                    enabled: true,
                    addEdge: function(edgeData, callback) {
                        callback(edgeData);
                    }
                },
                nodes: {
                    //physics: false
                },
                layout: {
                    hierarchical: {
                        enabled: true,
                        nodeSpacing: 100,
                        sortMethod: 'directed',
                        parentCentralization: false,
                        direction: "UD"

                    }
                },
                edges: {
                    arrows: {
                        to: {
                            enabled: true
                        }
                    },
                    smooth: {
                        type: 'cubicBezier',
                        //forceDirection: (directionInput.value == "UD" || directionInput.value == "DU") ? 'vertical' : 'horizontal',
                        roundness: 0.4
                    }
                }
            },
            container: '',
        }
    },

    computed: {
        graph_data: function() {
            for (var course in data.default){
                if (this.courses.includes(course)) {        // posssible optimization here
                    this.graph_nodes.add({
                        id: course,
                        label:course,
                        level: course.match(/\d/),
                        title: "YEET"
                        })
                    for (var req in data.default[course].Prerequisites){
                        this.graph_edges.add({
                            from: data.default[course].Prerequisites[req],
                            to: course
                            })
                    }
                }
            }
            return {
                nodes: this.graph_nodes,
                edges: this.graph_edges
            }
        }
    },

    mounted() {
        this.container = document.getElementById('mynetwork');
        this.network = new vis.Network(this.container, this.graph_data, this.options);
        this.network.on("showPopup", function (params) {
            document.getElementById("details").innerHTML = params + ": " + data.default[params].Name
        });
    }
}
</script>
