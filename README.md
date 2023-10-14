# deploying-mobile-app

This is a slightly modfied code from original project. Also updated the readme to make it more suitable for absolute beginners to react native. 

## About

This repo shows how to convert model from tensorflow to tensorflow.js and then use react native to deploy on mobile apps. 

Here is the app in action.

<video width="320" height="580" controls style="object-fit: cover;">
  <source src="demo/app_in_action.mp4" type="video/mp4">
</video>

## Setup for non-react users

You'll need to have a model in tensorflow (it could be in tf api or keras api), and need to convert into tensorflowjs, so it works without python on the edge device.

**Since this project was created with versions that I am not aware of, I have used the latest versions which I can find for tf and react-native environments.**

### Environment for Tensforflow
I have tested with the following environment:
- python            3.11
- tensorflow        2.13.0
- tensflowjs        4.11.0

### Converting Tensorflow (Keras API) model into TensorflowJS:
- create a model (of type `keras.models.*`)
- save it on disk using: `model.save("path/name.h5")`
-   convert the saved model using tensorflowjs:  
```
tensorflowjs_converter  --input_format=keras \
    --output_format=tfjs_graph_model \
    --split_weights_by_layer \
    --weight_shard_size_bytes=99999999 \
    --quantize_float16="*" \
    [input tensorflow model file path] [output tfjs model folder path]
```

To reduce model runtime (and size), it is 16 bit quanitzed.   
The model is converted to `tfjs_graph_model` which is an optimized version of the graph.
The model is broken into 100MB shards.

After getting model in tfjs, next step is to setup react native environment. For this you'll need to install nodejs as server-side Javascript runtime to compile the code. The original author of this project used yarn as package manager for node. Which should also be installed. Finally, you'll need expo to run this app. According to react native docs, expo includes set of tools built around react native which can developing app in minutes. It can help run the app on emulator or phone (on same network).

### Environment for ReactNative
I have tested with the following environment:
- nodejs v18.18.0 (You'll need to download it from their website and then install it)

After installing nodejs. Clone this project and navigate into it in terminal. and install yarn using commands:
- `corepack enable`
- `yarn init -2`
- `yarn set version stable`
- `yarn install`

Since the nodejs and yarn versions are newer, we need to update the project packages. Use the following commands for that:
- `yarn add expo-cli`
- `expo upgrade`
- `yarn start`

If any of these commands don't work, write `sudo ` before these commands.

## Note

Originally I was planning of using detector instead of classifier, but certain layers like nms have limited support or cause problems during conversion, after multiple failed tries, I decided to go with classifier only.

## Other

If you are interested in a guided exploration of this content, consider Manning's Live project [Deploying a Deep Learning Model on Web and Mobile Applications
](https://www.manning.com/liveproject/deploying-a-deep-learning-model-on-web-and-mobile-applications)
