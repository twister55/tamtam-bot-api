package chat.tamtam.botapi;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.openapitools.codegen.CodegenDiscriminator;
import org.openapitools.codegen.CodegenModel;

/**
 * @author <a href="mailto:vadim.yelisseyev@gmail.com">Vadim Yelisseyev</a>
 */
public class Type {
    public String name;
    public String doc;
    public String type;
    public boolean isEnum;
    public List<Map<String, String>> enumVars;
    public String additionalPropertiesType;
    public boolean hasVars;
    public List<TypeProperty> properties;

    @SuppressWarnings("unchecked")
    Type(CodegenModel model) {
        this.name = model.classname;
        this.doc = JsDocsBuilder.of(model);

        if (model.discriminator != null) {
            this.type = model.discriminator.getMappedModels().stream()
                .map(CodegenDiscriminator.MappedModel::getModelName)
                .collect(Collectors.joining(" | "));
        } else {
            this.isEnum = model.isEnum;
            this.enumVars = isEnum ? (List<Map<String, String>>) model.allowableValues.get("enumVars") : null;
            this.additionalPropertiesType = model.additionalPropertiesType;
            this.hasVars = model.hasVars;
            this.properties = model.allVars.stream().map(TypeProperty::new).collect(Collectors.toList());

            if (model.parentModel != null) {
                final CodegenDiscriminator discriminator = model.parentModel.discriminator;

                if (discriminator != null) {
                    discriminator.getMappedModels().stream()
                        .filter(m -> m.getModelName().equals(name))
                        .map(CodegenDiscriminator.MappedModel::getMappingName)
                        .findFirst()
                        .ifPresent(propertyType -> setProperty(discriminator.getPropertyName(), '\'' + propertyType + '\''));
                }
            }
        }
    }

    private void setProperty(String name, String type) {
        this.properties.stream()
            .filter(prop -> prop.name.equals(name))
            .findFirst()
            .ifPresent(typeProperty -> typeProperty.type = type);
    }
}
