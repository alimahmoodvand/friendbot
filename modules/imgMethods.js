module.exports={
// 	shadowHighlight:function(url){
// 		this.xml=`<image_process_call><image_url>${url}</image_url>
// 		<methods_list>
// 		<method>
// 		<name>shadow_highlight</name>
// 		<params>shadow_factor=5;highlight_factor=2;</params>
// 		</method>
// 		</methods_list></image_process_call>`;
// 		//console.log(this.xml)
// 		return this.xml;
// 	},
	روتوش :function(url){
this.xml=`<image_process_call><image_url>${url}</image_url>
		<methods_list>
		<method>
		<name>makeup</name>
		<params>use_skin_healing=true;use_flash_healing=true;use_wrinkles_healing=true;use_teeth_whitening=true;use_skin_color_corrector=false;</params>
		</method>
		</methods_list></image_process_call>`;
		return this.xml;
	},
// 	underWater :function(url){
// this.xml=`<image_process_call><image_url>${url}</image_url>
// 		<methods_list>
// 		<method>
// 		<name>underwater</name>
// 		<params></params>
// 		</method>
// 		</methods_list></image_process_call>`;
// 		return this.xml;
// 	},
// 	oilPainting :function(url){
// this.xml=`<image_process_call><image_url>${url}</image_url>
// 		<methods_list>
// 		<method>
// 		<name>oil_painting</name>
// 		<params></params>
// 		</method>
// 		</methods_list></image_process_call>`;
// 		return this.xml;
// 	},
	پاستل :function(url){
this.xml=`<image_process_call><image_url>${url}</image_url>
		<methods_list>
		<method>
		<name>collage</name>
		<params>template_name=pastel_drawing_vs_photography;crop_portrait=true;</params>
		</method>
		</methods_list></image_process_call>`;
		return this.xml;
	},
	مداد :function(url){
this.xml=`<image_process_call><image_url>${url}</image_url>
		<methods_list>
		<method>
		<name>collage</name>
		<params>template_name=sketch;crop_portrait=true;</params>
		</method>
		</methods_list></image_process_call>`;
		return this.xml;
	},
	زغالی :function(url){
this.xml=`<image_process_call><image_url>${url}</image_url>
		<methods_list>
		<method>
		<name>collage</name>
		<params>template_name=vintage_charcoal_sketch;crop_portrait=true;</params>
		</method>
		</methods_list></image_process_call>`;
		return this.xml;
	},
		پازل :function(url){
this.xml=`<image_process_call><image_url>${url}</image_url>
		<methods_list>
		<method>
		<name>collage</name>
		<params>template_name=puzzle;crop_portrait=true;</params>
		</method>
		</methods_list></image_process_call>`;
		return this.xml;
	},
	مدادرنگی :function(url){
this.xml=`<image_process_call><image_url>${url}</image_url>
		<methods_list>
		<method>
		<name>collage</name>
		<params>template_name=crayon_drawing;crop_portrait=true;</params>
		</method>
		</methods_list></image_process_call>`;
		return this.xml;
	},
		کلمه :function(url){
this.xml=`<image_process_call><image_url>${url}</image_url>
		<methods_list>
		<method>
		<name>collage</name>
		<params>template_name=photo_made_of_words;crop_portrait=true;</params>
		</method>
		</methods_list></image_process_call>`;
		return this.xml;
	},

// 	cartoon :function(url){
// this.xml=`<image_process_call>
//   <image_url>${url}</image_url>
//   <methods_list>
//     <method order="1">
//       <name>desaturation</name>
//       </method>
//   </methods_list>
 
//   <result_format>png</result_format>
//   <result_size>600</result_size>
// </image_process_call>`;
// 		return this.xml;
// 	},
// 	pointilism :function(url){
// this.xml=`<image_process_call>
//   <image_url>${url}</image_url>
//   <methods_list>
//     <method order="1">
//       <name>cartoon</name>
//             <params>quant_levels=4;use_anisotropic=true;fill_solid_color=true;</params>
//     </method>
//   </methods_list>
// </image_process_call>`;
// 		return this.xml;
// 	},
// 	caricature :function(url){
// this.xml=`<image_process_call>
//   <image_url>${url}</image_url>
//   <methods_list>
//     <method order="1">
//       <name>caricature</name>
//       <params>cartoon=true;type=14;</params>
//     </method>
//   </methods_list>
 
//   <result_format>png</result_format>
//   <result_size>600</result_size>
// </image_process_call>`;
// 		return this.xml;
// 	},
	خنده :function(url){
this.xml=`<image_process_call>
  <image_url>${url}</image_url>
  <methods_list>
    <method order="1">
      <name>caricature</name>
      <params>type=1;strength=-1;</params>
    </method>
  </methods_list>
</image_process_call>`;
		return this.xml;
	},
	حبابی  :function(url){
this.xml=`<image_process_call>
  <image_url>${url}</image_url>
  <methods_list>
    <method order="1">
      <name>caricature</name>
      <params>type=11;</params>
    </method>
  </methods_list>
</image_process_call>`;
		return this.xml;
	},
	ونگوگ :function(url){
this.xml=`<image_process_call>
  <image_url>${url}</image_url>
  <methods_list>
    <method order="1">
      <name>van_gog</name>
      </method>
  </methods_list>
</image_process_call>`;
		return this.xml;
	},
		سیاسفید  :function(url){
this.xml=`<image_process_call>
  <image_url>${url}</image_url>
  <methods_list>
    <method order="1">
      <name>dry_brush</name>
      </method>
  </methods_list>
</image_process_call>`;
		return this.xml;
	}

// 	cartoonify :function(url){
// this.xml=`<image_process_call>
//   <image_url>${url}</image_url>
//   <methods_list>
//     <method order="1">
//       <name>caricature</name>
//       <params>type=6;</params>
//     </method>
//   </methods_list>
 
//   <result_format>png</result_format>
//   <result_size>600</result_size>
// </image_process_call>`;
// 		return this.xml;
// 	},
// 	troll :function(url){
// this.xml=`<image_process_call>
//   <image_url>${url}</image_url>
//   <methods_list>
//     <method order="1">
//       <name>caricature</name>
//       <params>type=5;</params>
//     </method>
//   </methods_list>
 
//   <result_format>png</result_format>
//   <result_size>600</result_size>
// </image_process_call>`;
// 		return this.xml;
// 	}
}