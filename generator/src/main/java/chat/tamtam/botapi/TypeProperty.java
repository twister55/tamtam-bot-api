package chat.tamtam.botapi;

import org.openapitools.codegen.CodegenProperty;

/**
 * @author <a href="mailto:vadim.yelisseyev@gmail.com">Vadim Yelisseyev</a>
 */
public class TypeProperty {
    public String name;
    public String type;
    public String doc;
    public boolean required;
    public boolean isNullable;

    TypeProperty(CodegenProperty property) {
        this.name = property.name;
        this.type = property.dataType;
        this.doc = JsDocsBuilder.of(property);
        this.required = property.required;
        this.isNullable = property.isNullable;
    }
}
