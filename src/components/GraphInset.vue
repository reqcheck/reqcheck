<template id="mytmp">
    <div>
        <div id="mynetwork" style="height:900px;"></div>
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
                        direction: "DU"

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

        // Big piece of gross logic which builds the tree.

        graph_data: function() {

            // Start by adding all of the supplied courses:
            for (var course in this.courses){
                var node_title = this.courses[course]
                this.graph_nodes.add({
                        id: node_title,
                        label: node_title,
                        level: node_title.match(/\d/),
                })
            }

            var flag = false    // eslint-disable-next-line
            while (true) {
                flag = false
                var child = ""
                // Now add all of the prereqs until there's none unfulfilled:
                for (var node in this.graph_nodes.getIds()){
                    var parent = this.graph_nodes.get()[node].id
                    for (var req in data.default[parent].Prerequisites){
                        child = data.default[parent].Prerequisites[req]
                        if (this.graph_nodes.get(child) == null) {
                            flag = true
                            this.graph_nodes.add({
                                color: {
                                    background: '#e88d8d',
                                    border: '#e84a4a',
                                    highlight: {
                                        border: '#e84a4a',
                                        background: '#e8aeae'
                                    },
                                    hover: {
                                        border: '#e84a4a',
                                        background: '#e8aeae'
                                    },
                                },
                                id: child,
                                label: child,
                                level: child.match(/\d/),
                            })
                        }
                    }
                }
                if(!flag){
                    break
                }
            }

            // Add the prereq edges from all nodes in the tree
            for (var parent_node in this.graph_nodes.getIds()){
                var to = this.graph_nodes.get()[parent_node].id
                for (var edge_req in data.default[to].Prerequisites){
                    var from = data.default[to].Prerequisites[edge_req]
                    this.graph_edges.add({
                            from: from,
                            to: to
                    })
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
        this.net
        this.network.on("hoverNode", function (params) {
            document.getElementById("details").innerHTML = params.node + ": " + data.default[params.node].Name
        });
    }
}
</script>
