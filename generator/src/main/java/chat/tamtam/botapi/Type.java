package chat.tamtam.botapi;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.openapitools.codegen.CodegenModel;

/**
 * @author <a href="mailto:vadim.yelisseyev@gmail.com">Vadim Yelisseyev</a>
 */
public class Type {
    public final String classname;
    public final String parent;
    public final String doc;
    public final boolean isEnum;
    public final List<Map<String, String>> enumVars;
    public final String additionalPropertiesType;
    public final List<TypeProperty> properties;
    public final boolean hasVars;

    @SuppressWarnings("unchecked")
    Type(CodegenModel model) {
        this.classname = model.classname;
        this.parent = model.parent;
        this.doc = JsDocsBuilder.of(model);
        this.isEnum = model.isEnum;
        this.enumVars = isEnum ? (List<Map<String, String>>) model.allowableValues.get("enumVars") : null;
        this.additionalPropertiesType = model.additionalPropertiesType;
        this.properties = model.vars.stream().map(TypeProperty::new).collect(Collectors.toList());
        this.hasVars = model.hasVars;
    }
}
