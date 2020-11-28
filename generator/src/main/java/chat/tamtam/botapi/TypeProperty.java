package chat.tamtam.botapi;

import org.openapitools.codegen.CodegenProperty;

/**
 * @author <a href="mailto:vadim.yelisseyev@gmail.com">Vadim Yelisseyev</a>
 */
public class TypeProperty {
    public final String name;
    public final String doc;
    public final boolean required;
    public final String dataType;
    public final boolean isNullable;

    TypeProperty(CodegenProperty property) {
        this.name = property.name;
        this.doc = JsDocsBuilder.of(property);
        this.required = property.required;
        this.dataType = property.dataType;
        this.isNullable = property.isNullable;
    }
}
