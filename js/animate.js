(function() {
    tinyMCE.PluginManager.add('sigja_button', function( editor, url ) {
        editor.addCommand('sigja_tinymcecustombutton', function () {
            var className = editor.selection.getNode().className;
            var isUpdate = className.includes("sigja_ja");
            var parentClassName = editor.selection.getNode().parentElement.className.includes("sigja_ja");
            var isImage = editor.selection.getNode().tagName == 'IMG' ? true : false; 
            
            var defaultAnimation = "bounce";
            var defaultSpeed = "normal";
            var defaultDelay = "0s";

            if(isUpdate || parentClassName){
                var allClasses = '';
                if(isImage){
                    allClasses = editor.selection.getNode().parentElement.className.toString().split(' ');
                } else {
                    allClasses = editor.selection.getNode().className.toString().split(' ');
                }

                allClasses.forEach(function(str) {
                    if(str.includes("sigja_a_")){
                        defaultAnimation = str.substring(8);
                    } else if(str.includes("sigja_s_")){
                        defaultSpeed = str.substring(8);
                    } else if(str.includes("sigja_d_")){
                        defaultDelay = str.substring(8);
                    }
                });
            }
 
            var windowManagerBody = [{
                type: 'listbox',
                name: 'animation',
                label: 'Choose Animation:',
                values: [
                    { text: 'Bounce', value: 'bounce' },
                    { text: 'Fade In', value: 'fadeIn' }, 
                    { text: 'Flash', value: 'flash' },
                    { text: 'Flip In X', value: 'flipInX' },
                    { text: 'Flip In Y', value: 'flipInY' },
                    { text: 'Pulse', value: 'pulse' },
                    { text: 'Pulse X2 ', value: 'pulseX2' },
                    { text: 'Rotate In', value: 'rotateIn' },
                    { text: 'Rotate In Down Left', value: 'rotateInDownLeft' },
                    { text: 'Rotate In Down Right', value: 'rotateInDownRight' },
                    { text: 'Slide In Down', value: 'slideInDown' },
                    { text: 'Slide In Left', value: 'slideInLeft' },
                    { text: 'Slide In Right', value: 'slideInRight' }, 
                    { text: 'Slide In Up', value: 'slideInUp' },
                    { text: 'Zoom In', value: 'zoomIn' },
                ],
                value: defaultAnimation
            },
            {
                type: 'listbox',
                name: 'speed',
                label: 'Speed:',
                values: [
                    { text: 'Slow', value: 'slow' }, 
                    { text: 'Normal', value: 'normal' },
                    { text: 'Fast', value: 'fast' },
                    { text: 'Very Fast', value: 'vfast' },
                ],
                value: defaultSpeed
            },
            {
                type: 'listbox',
                name: 'delay',
                label: 'Delay:',
                values: [
                    { text: 'No Delay', value: '0s' }, 
                    { text: '0.5 seconds', value: '05s' },
                    { text: '1 seconds', value: '1s' },
                    { text: '1.5 seconds', value: '15s' },
                ],
                value: defaultDelay
            }];

            if(isUpdate || parentClassName){
                editor.windowManager.open({
                    title: 'Just Animate',
                    buttons: [{
                        text: 'OK',
                        subtype: 'primary',
                        onclick: 'submit'
                    },
                    {
                        text: 'Remove Animation',
                        onclick: function() {
                            if(isImage){
                                var nodeRemove = editor.selection.getNode().parentElement;
                                var nodeReplace = editor.selection.getNode().parentElement.innerHTML;
                                editor.dom.remove(nodeRemove);
                                tinyMCE.execCommand('mceReplaceContent', false, nodeReplace);
                            } else {
                                editor.dom.removeClass(editor.selection.getNode(), className);
                            }
                            (this).parent().parent().close();
                        }
                    }],
                    body: windowManagerBody,
                    onsubmit: function (e) {
                        var classAnimation = 'sigja_a_' + e.data.animation + ' sigja_s_' + e.data.speed + ' sigja_d_' + e.data.delay;
                        if(isImage){
                            var nodeRemove = editor.selection.getNode().parentElement;
                            var nodeReplace = editor.selection.getNode().parentElement.innerHTML;
                            editor.dom.remove(nodeRemove);
                            tinyMCE.execCommand('mceReplaceContent', false, '<span class="'+ classAnimation +' sigja_ja">'+ nodeReplace + '</span>');
                        } else {
                            editor.dom.removeClass(editor.selection.getNode(), className);
                            editor.dom.addClass(editor.selection.getNode(), classAnimation);
                            editor.dom.addClass(editor.selection.getNode(), 'sigja_ja');
                        }
                    }
                });
            } else {
                editor.windowManager.open({
                    title: 'Choose Animation',
                    body: windowManagerBody,
                    onsubmit: function (e) {
                        var classAnimation = 'sigja_a_' + e.data.animation + ' sigja_s_' + e.data.speed + ' sigja_d_' + e.data.delay;
                        if(isImage){
                            var node = editor.selection.getContent();
                            tinyMCE.execCommand('mceReplaceContent', false, '<span class="'+ classAnimation +' sigja_ja">'+ node + '</span>');
                        } else {
                            editor.dom.addClass(editor.selection.getNode(), classAnimation);
                            editor.dom.addClass(editor.selection.getNode(), 'sigja_ja');
                        }
                        


                    }
                });

                
            }
        });
        editor.addButton('sigja_button', {
            title: 'Just Animate',
            cmd: 'sigja_tinymcecustombutton',
            icon: 'icon sigjan-animate-icon',
        });
    });
})();
