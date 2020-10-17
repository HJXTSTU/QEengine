#version 420 core

out vec4 FragColor;

in vec2 TexCoords;

uniform sampler2D tex;

void main(){
	FragColor = texture2D(tex,TexCoords);
}