<template id="mytmp">
    <div>
        <div id="mynetwork" style="height:600px;"></div>
    </div>
</template>

<script>

import * as vis from "vis";
import * as data from '@/assets/sampledata.json'

export default {
    name: 'GraphInset',
    props: {
        courses: String
    },
        data() {
        return {
            options: {
                manipulation: {
                    enabled: false,
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
                    }
                }
            },
            container: '',
        }
    },

    computed: {
        graph_data: function() {
            let graph_nodes = []
            let graph_edges = []
            for (var course in data.default){
                graph_nodes.push({id: course, label:course})
                for (var req in data.default[course].Prerequisites){
                    graph_edges.push({from: data.default[course].Prerequisites[req], to: course})
                }
            }
            return {
                nodes: graph_nodes,
                edges: graph_edges
            }
        }
    },

    mounted() {
        this.container = document.getElementById('mynetwork');
        this.network = new vis.Network(this.container, this.graph_data, this.options);
    }
}
</script>