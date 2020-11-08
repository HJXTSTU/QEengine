#version 420 core
out vec4 FragColor;

in vec2 TexCoords;

uniform sampler2D image;

uniform bool horizontal;

uniform float weight[10];

uniform int size;

uniform float MAX_VALUE;

uniform float MIN_VALUE;

void main(){
	vec2 tex_offset = 1.0 / textureSize(image, 0); // gets size of single texel
    vec3 result = texture2D(image, TexCoords).rgb * weight[0]; // current fragment's contribution
    if(horizontal)
    {
        for(int i = 1; i < size; ++i)
        {
            result += texture(image, TexCoords + vec2(tex_offset.x * i, 0.0)).rgb * weight[i];
            result += texture(image, TexCoords - vec2(tex_offset.x * i, 0.0)).rgb * weight[i];
        }
    }
    else
    {
        for(int i = 1; i < size; ++i)
        {
            result += texture(image, TexCoords + vec2(0.0, tex_offset.y * i)).rgb * weight[i];
            result += texture(image, TexCoords - vec2(0.0, tex_offset.y * i)).rgb * weight[i];
        }
    }
	vec3 max_value = vec3(MAX_VALUE,MAX_VALUE,MAX_VALUE);
	vec3 min_value = vec3(MIN_VALUE,MIN_VALUE,MIN_VALUE);
	result = max(min(result,max_value),min_value);
    FragColor = vec4(result, 1.0);
}