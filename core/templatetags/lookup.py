from django import template

register = template.Library()


@register.filter(name='lookup')
def cut(value, arg):
    for key, value in value.iteritems():
        print key, value
    print 'TEST0', value, arg
    print 'TEST1', value[arg]
    return value[arg]
